import cdk = require('@aws-cdk/core');
import lambda = require('@aws-cdk/aws-lambda');

export class AwsCdkPrototypeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const helloCdk = new lambda.Function(this, 'HelloCdkHandler', {
        runtime: lambda.Runtime.NODEJS_8_10,
        code: lambda.Code.asset('lambda'),
        handler: 'hello.handler'
    });
  }
}
