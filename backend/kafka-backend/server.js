let connection =  require('./kafka/Connection');
const db = require('../dbCon')

const userLogin = require('./services/userServices/loginUser')
const getProduct = require('./services/productservices/getProduct')
const addfavourite = require('./services/userServices/addFavorite')
const addOrder = require('./services/orderServices/addOrder')
const userOrders = require('./services/orderServices/getUserOrders')

db()

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    let consumer = connection.getConsumer(topic_name);
    let producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        let data = JSON.parse(message.value);

        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            let payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest('etsy_login', userLogin)
handleTopicRequest('etsy_getProducts', getProduct)
handleTopicRequest('etsy_addfavorites', addfavourite)
handleTopicRequest('etsy_add_order',addOrder)
handleTopicRequest('get_user_orders', userOrders)