const { readFile } = require('fs/promises');

function setupDB(db) {
    db.serialize(() => {
        db.run(`
            CREATE TABLE flavors (
                Id int,
                Name varchar(255),
                Category varchar(255),
                CategoryId varchar(255)
            );
        `)
        db.run(`
            CREATE TABLE quote_requests (
                Name varchar(255),
                Email varchar(255),
                Capability varchar(255),
                Comments varchar(255),
                Newsletter BOOL
            );
        `)
    })

    readFile('./flavors.csv', 'utf-8').then(data => {
        let d = data.matchAll(/"(\d+)","(.+)","(.+)"/g)
        for (let match of d) {
            const flavor_id = match[1];
            const flavor_category_name = match[2]
            const flavor_name = match[3].replaceAll(/\'/g, "''");;
            const flavor_category_id = flavor_category_name.toLowerCase().replace(/[^\w\d]+/g, '-')
            db.serialize(() => {
                db.run(`
                INSERT INTO flavors (Id, Name, Category, CategoryId)
                VALUES ('${flavor_id}', '${flavor_name}', '${flavor_category_name}', '${flavor_category_id}')
                `, (err) => {
                    if (err) {
                        console.log(cmd, err)
                    }
                })
            });
        }
    });
}

module.exports = setupDB