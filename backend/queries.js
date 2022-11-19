const fetchCrawlData = "SELECT * FROM results";

const tableExist = "SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'results');";

const createResultsTable = "CREATE TABLE results(Brand VARCHAR(255), Title VARCHAR(255), Image VARCHAR(255) PRIMARY KEY);";

const createQueueTable = "CREATE TABLE queue(ID INT bigserial PRIMARY KEY NOT NULL, Job_Name VARCHAR(255), Job_Status VARCHAR(255), Job_url VARCHAR(255), Job_Created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), Job_Updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());";

const InsertQueue = "INSERT INTO queue(Job_Name, Job_Status, Job_url) VALUES ($1, $2, $3);";

const checkImageUrl = "SELECT * FROM results where Image = $1";

const InsertCrawledData = "INSERT INTO results(Brand, Title, Image) VALUES ($1, $2, $3);";

module.exports = {
    fetchCrawlData,
    tableExist,
    createResultsTable,
    // InsertCrawledData
}