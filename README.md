# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

# AWS CLIのインストール

```
$ pip3 --version
pip 19.3.1 from /Users/xxx/.anyenv/envs/pyenv/versions/3.8.0/lib/python3.8/site-packages/pip (python 3.8)

$ pip3 install awscli --upgrade --user

# PATHが通っていない場合、.zshrcに追記
$ tail -1 ~/.zshrc
export PATH=~/.local/bin:$PATH

$ source ~/.zshrc

$ aws --version
aws-cli/1.16.266 Python/3.8.0 Darwin/19.0.0 botocore/1.13.2
```

# AWS CLIの設定
```
$ aws configure
AWS Access Key ID [None]: xxx
AWS Secret Access Key [None]: xxx
Default region name [None]: ap-northeast-1
Default output format [None]: json
```

# AWS CDK Toolkitのインストール

```
# Node.jsをアップグレード
$ ndenv install v12.13.0
$ ndenv global v12.13.0

# AWS CDK Toolkitをインストール
$ npm install -g aws-cdk

$ source ~/.zshrc
$ cdk --version
1.14.0 (build 261a1bf)
```

# 作業準備

作業ディレクトリ作成
```
$ mkdir aws-cdk-prototype
$ cd aws-cdk-prototype
```

初期化
```
$ cdk init app --language=typescript
```

必要なライブラリをインストール

```
# ここではLambda
$ npm install @aws-cdk/aws-lambda
```

```
$ mkdir lambda
$ vim lambda/hello.ts
```

```lambda/hello.ts
export async function handler(event: any) {
  return {
    statusCode: 200,
    body: 'Hello AWS CDK!!'
  }
}
```

# 差分確認

```
$ cdk diff
Stack AwsCdkPrototypeStack
IAM Statement Changes
┌───┬────────────────────────┬────────┬────────────────────────┬──────────────────────────┬───────────┐
│   │ Resource               │ Effect │ Action                 │ Principal                │ Condition │
├───┼────────────────────────┼────────┼────────────────────────┼──────────────────────────┼───────────┤
│ + │ ${HelloCdkHandler/Serv │ Allow  │ sts:AssumeRole         │ Service:lambda.amazonaws │           │
│   │ iceRole.Arn}           │        │                        │ .com                     │           │
└───┴────────────────────────┴────────┴────────────────────────┴──────────────────────────┴───────────┘
IAM Policy Changes
┌───┬────────────────────────────────┬────────────────────────────────────────────────────────────────┐
│   │ Resource                       │ Managed Policy ARN                                             │
├───┼────────────────────────────────┼────────────────────────────────────────────────────────────────┤
│ + │ ${HelloCdkHandler/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBa │
│   │                                │ sicExecutionRole                                               │
└───┴────────────────────────────────┴────────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Parameters
・・・
```

# デプロイ

以下のエラーが出た。

```
$ cdk deploy
 ❌  AwsCdkPrototypeStack failed: Error: This stack uses assets, so the toolkit stack must be deployed to the environment (Run "cdk bootstrap aws://unknown-account/unknown-region")
 ・・・
```

初回はbootstrapが必要？

```
$ cdk bootstrap
 ⏳  Bootstrapping environment aws://xxx/ap-northeast-1...
CDKToolkit: creating CloudFormation changeset...
 0/2 | 3:05:17 AM | CREATE_IN_PROGRESS   | AWS::S3::Bucket | StagingBucket
 0/2 | 3:05:19 AM | CREATE_IN_PROGRESS   | AWS::S3::Bucket | StagingBucket Resource creation Initiated
 1/2 | 3:05:41 AM | CREATE_COMPLETE      | AWS::S3::Bucket | StagingBucket
 2/2 | 3:05:42 AM | CREATE_COMPLETE      | AWS::CloudFormation::Stack | CDKToolkit
 ✅  Environment aws://617995924773/ap-northeast-1 bootstrapped.
```

再実行
```
$ cdk deploy
This deployment will make potentially sensitive changes according to your current security approval level (--require-approval broadening).
Please confirm you intend to make the following modifications:

IAM Statement Changes
┌───┬────────────────────────┬────────┬────────────────────────┬──────────────────────────┬───────────┐
│   │ Resource               │ Effect │ Action                 │ Principal                │ Condition │
├───┼────────────────────────┼────────┼────────────────────────┼──────────────────────────┼───────────┤
│ + │ ${HelloCdkHandler/Serv │ Allow  │ sts:AssumeRole         │ Service:lambda.amazonaws │           │
│   │ iceRole.Arn}           │        │                        │ .com                     │           │
└───┴────────────────────────┴────────┴────────────────────────┴──────────────────────────┴───────────┘
IAM Policy Changes
┌───┬────────────────────────────────┬────────────────────────────────────────────────────────────────┐
│   │ Resource                       │ Managed Policy ARN                                             │
├───┼────────────────────────────────┼────────────────────────────────────────────────────────────────┤
│ + │ ${HelloCdkHandler/ServiceRole} │ arn:${AWS::Partition}:iam::aws:policy/service-role/AWSLambdaBa │
│   │                                │ sicExecutionRole                                               │
└───┴────────────────────────────────┴────────────────────────────────────────────────────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Do you wish to deploy these changes (y/n)? y
AwsCdkPrototypeStack: deploying...
Updated: asset.xxx (zip)
AwsCdkPrototypeStack: creating CloudFormation changeset...
 0/4 | 3:07:25 AM | CREATE_IN_PROGRESS   | AWS::CDK::Metadata    | CDKMetadata
 0/4 | 3:07:25 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role        | HelloCdkHandler/ServiceRole (HelloCdkHandlerServiceRolexxx)
 0/4 | 3:07:26 AM | CREATE_IN_PROGRESS   | AWS::IAM::Role        | HelloCdkHandler/ServiceRole (HelloCdkHandlerServiceRolexxx) Resource creation Initiated
 0/4 | 3:07:27 AM | CREATE_IN_PROGRESS   | AWS::CDK::Metadata    | CDKMetadata Resource creation Initiated
 1/4 | 3:07:27 AM | CREATE_COMPLETE      | AWS::CDK::Metadata    | CDKMetadata
 2/4 | 3:07:44 AM | CREATE_COMPLETE      | AWS::IAM::Role        | HelloCdkHandler/ServiceRole (HelloCdkHandlerServiceRolexxx)
 2/4 | 3:07:48 AM | CREATE_IN_PROGRESS   | AWS::Lambda::Function | HelloCdkHandler (HelloCdkHandler2C07A554)
 2/4 | 3:07:48 AM | CREATE_IN_PROGRESS   | AWS::Lambda::Function | HelloCdkHandler (HelloCdkHandler2C07A554) Resource creation Initiated
 3/4 | 3:07:49 AM | CREATE_COMPLETE      | AWS::Lambda::Function | HelloCdkHandler (HelloCdkHandler2C07A554)
 4/4 | 3:07:50 AM | CREATE_COMPLETE      | AWS::CloudFormation::Stack | AwsCdkPrototypeStack

 ✅  AwsCdkPrototypeStack

Stack ARN:
arn:aws:cloudformation:ap-northeast-1:xxx:stack/AwsCdkPrototypeStack/xxx
```

https://ap-northeast-1.console.aws.amazon.com/lambda/home?region=ap-northeast-1#/functions

# Sequelize

## モデルのスケルトン生成コマンド

```
# 実例
$ npx sequelize-cli model:generate --name employee --attributes id:bigint,name:string,created_at:date,updated_at:date
`````
