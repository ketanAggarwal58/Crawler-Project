const fetchCrawlData = `SELECT * FROM results`;

const tableExist = `SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'actor');`;

const createTable = `CREATE TABLE results(Brand VARCHAR(255), Title VARCHAR(255), Image VARCHAR(255) PRIMARY KEY);`;

// const InsertCrawledData = `INSERT INTO results(Brand, Title, Image) VALUES ('${params[0]}', '${params[1]}', '${params[2]}');`;

module.exports = {
    fetchCrawlData,
    tableExist,
    createTable,
    // InsertCrawledData
}