var dateToObjectId = date => {    
    var datePart = Math.floor(date/1000).toString(16);
    
    // Add support for dates down to 1970-01-01 (Unix epoch)
    // The datePart MUST always represent 4 bytes.
    while(datePart.length < 8) 
        datePart = '0' + datePart;
        
    return ObjectId(datePart + "0000000000000000");
}

var allDocumentsCreatedBefore = date => {
    return {_id : {$lt: dateToObjectId(date)}};
};

var options = {
    writeConcern: { 
        w: 1 // See: https://docs.mongodb.com/v3.6/reference/write-concern/
    }
}


// ### README (short version)
// This script deletes documents from a given collection filtering on the time component of
// a mongodb object-id (path: _id). If the object-id was created upon document created it effectively
// indicates the creation date and time of a document. 
//
// Please note that the use of this script can lead to (accidental) data loss.

// STEP 1: Fill in the name of the target collection and the target date.
var collectionName = 'TypeTheCollectionNameHere';
var targetDate = ISODate('1969-06-20T20:17:00Z');

try {
    
    // STEP 2: Test the filter ( S A F E -ish )
    db.getCollection(collectionName).find(allDocumentsCreatedBefore(targetDate)).sort({_id: -1}).limit(10);
    
    // STEP 3: Execute delete operation ( D A N G E R )
    //db.getCollection(collectionName).deleteMany(allDocumentsCreatedBefore(targetDate), options);
    
} catch (e) {
    print (e);
}
