var byteToGigs = bytes => bytes / 1073741824;
var dateToObjectId = date => ObjectId(Math.floor(date/1000).toString(16) + "0000000000000000");

var countItemsCreated = function(collection, startDate, endDate) {
    var startId = dateToObjectId(startDate);
    var endId = dateToObjectId(endDate);
    
    var count = collection.find({_id: {$gte: startId, $lt: endId }}).count();
    var collectionStats = collection.stats();
    
    print(collectionStats.ns + '\t' + byteToGigs(count * collectionStats.avgObjSize));
};
    
db.getCollectionNames().forEach(collectionName => {
  var collection = db.getCollection(collectionName);
  countItemsCreated(collection, ISODate('2020-01-01T00:00:00Z'), ISODate('2020-02-01T00:00:00Z'));
});
