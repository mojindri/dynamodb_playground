class PMIDocument {
    constructor(at_id, bucketname, file_name) {
        this.AT_ID = {S: at_id};
        this.BUCKET_NAME = {S: bucketname};
        this.FILE_NAME = {S: file_name};
    }
}
module.exports = {
    PMIDocument
}