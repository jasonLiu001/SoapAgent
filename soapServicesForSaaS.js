/**
 * Created by wang on 2014/10/17.
 */
var soap=require('soap');
var app2SaaSServiceUrl="http://121.42.51.227:3337/WebServices/App2SaaSService?wsdl";//实际外网服务地址

/**
 *
 * @summary: 访问外网环境服务的代理程序
 * */
exports.webServicesForSaaS = {
    App2SaaSServiceService: {
        App2SaaSService: {
            execute: function (args, callback) {
                soap.createClient(app2SaaSServiceUrl, function (err, client) {
                    //调用外网实际服务地址
                    client.execute(args, function (err, result) {
                        if(err){
                            console.error(err);
                        }
                        callback(result);
                    });
                });
            }
        }
    }
};
