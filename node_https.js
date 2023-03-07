/* 
Christos Psimadas
*/

const express = require('express');
const app = express();
app.use(express.json());

const Songs = [
    { id: 1, genre: 'Jazz Fusion', song: 'Deacon Blues', artist: 'Steely Dan', month:'September', year:'1977'},
    { id: 2, genre: 'Rock', song: 'Tom Sawyer', artist: 'Primus', month:'February', year:'1981'},
    { id: 3, genre: 'Funk', song: 'Jerry Was A Racecar Driver', artist: 'Primus', month:'May', year:'1991'},
    { id: 4, genre: 'Psychedelic Rock', song: 'Are You Experienced?', artist: 'The Jimi Hendrix Experience', month:'May', year:'1967'},
    { id: 5, genre: 'Jazz', song: 'Fly Me To The Moon', artist: 'Kaye Ballard', month:'April', year:'1954'},
    { id: 6, genre: 'R&B', song: 'Ms. Jackson', artist: 'OutKast', month:'October', year:'2000'},
];

app.listen(2000, () => {console.log('Listening on port TWO THOUSAND')});

//=========== ROUTES FOR HTTP GET REQUESTS ==========
app.get('/api', (req, res) => {
    res.send("Music Backend Christos Psimadas.");
});

app.get('/api/Songs', (req, res) => {
    res.send(Songs);
});
app.get('/api/Songs/:id', (req, res) => {
    const music = Songs.find(search => search.id === parseInt(req.params.id));
    if (!music) {
        res.status(400).send("Song with ID not found");
        return;
    }
    res.send(music);
});
app.get('/api/Songs/filtermonth/:month', (req, res) => {
    let matchMonth = [];
    for (let music of Songs) {
        if (music.month == req.params.month) {
            matchMonth.push(music);
        }
    }
    if (matchMonth.length !== 0) {
        res.send(matchMonth);
        return;
    } 
    res.status(400).send("Songs with month not found");
});
app.get('/api/Songs/filteryear/:year', (req, res) => {
    let matchYear = [];
    for (let music of Songs) {
        if (music.year == req.params.year) {
            matchYear.push(music);
        }
    }
    if (matchYear.length !== 0){
        res.send(matchYear);
        return;
    }
    res.status(400).send("Songs with year not found");
});

//=========== ROUTES FOR HTTP POST REQUESTS ==========
app.post('/api/Songs', (req, res) => {
    if (req.body.genre.length < 3 || req.body.genre.length >= 30 || req.body.song.length < 3 || req.body.song.length >= 30 ) {
        res.status(400).send("Genre and Song names must be between 3 and 30 characters long and ID");
        return;
    }

    //if (req.body.genre.length >= 3 && req.body.genre.length < 30)
    else {
        music = {
            id: Songs.length + 1,
            genre: req.body.genre,
            song: req.body.song,
            artist: req.body.artist,
            month: req.body.month,
            year: req.body.year
        }
        Songs.push(music);
        res.send(Songs);
    }
});    

//=========== ROUTES FOR HTTP PUT REQUESTS ==========
app.put('/api/Songs/edit', (req,res)=>{
    let original = Songs[req.body.id - 1];
    if (original == undefined || (req.body.genre.length < 3 || req.body.genre.length >= 30) || (req.body.song.length < 3 || req.body.song.length >= 30 )) {
        res.status(400).send("Song name must be between 3 and 30 characters long, and ID must exist");
        return;
    }
    else if(original !== undefined && (req.body.genre.length >= 3 && req.body.genre.length < 30) || (req.body.song.length < 3 || req.body.song.length >= 30 )){
        music = {
            id: original.id,
            genre: req.body.genre,
            song: req.body.song,
            artist: req.body.artist,
            month: req.body.month,
            year: req.body.year
        }
        Songs[original.id - 1] = music;
        res.send(music);
    }
});

//=========== ROUTES FOR HTTP DELETE REQUESTS ==========
app.delete('/api/Songs/delete', (req, res) => {
    original = Songs[req.body.id - 1];
    if (!original){
        res.status(400).send("ID does not exist");
        return;
    }
    else if (original !== undefined) {
        Songs.splice(Songs.indexOf(original), 1);
        res.send(original);
    } 
})


/*
1. API's are an easy way to have applications communicate with each other without making application-specific code.
2. I learned how to us Postman
3. I would like to learn about Lock, copy, and patch. 
*/