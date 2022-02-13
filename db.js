const sqlite3 = require('sqlite3')
db = new sqlite3.Database('./kot.db', (err) => {
    if(err) {
        console.log(err)
    }
});

const createTable = `create table if not exists visited (id int primary key);`

db.run(createTable, err => {
    if(err) {
        console.log(err) 
    } else {
        console.log('created table')
    }
});

const getUnvisitedPost = async (data) => {
    for(let i=0; i < data.length; i++) {
        const nvPost = await isNotVisited(data[i]);
        if(nvPost) {
            return data[i];
        }
    }
    throw new Error("no unvisited post found.");
};

const isNotVisited = async (post) => {
    return checkIfIDDoesNotExist(post.id);
};

const checkIfIDDoesNotExist = (id) => {
    return new Promise((resolve, reject) => {
        console.log(`Checking if ${id} exists`);
        db.all(`select id from visited where id = ? limit 1`, [id], (err, rows) => {
            if(err) {
                reject(err)
            } else {
                if(rows.length === 0) {
                    console.log(`${id} does not exist`);
                    resolve(true);
                } else {
                    console.log(`${id} exists`);
                    resolve(false);
                }
            }
        });
    });
};

const markAsVisited = async (post) => {

    return insertID(post.id).then(r => post);

};

const insertID = async (id) => {
    return new Promise((resolve, reject) => {
        db.run(`insert into visited (id) values (?)`, [id], (err) => {
            if(err) {
                console.log(`error inserting ${id} into db`);
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
};

module.exports = {
    markAsVisited,
    isNotVisited,
    getUnvisitedPost
}