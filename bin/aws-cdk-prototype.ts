#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { AwsCdkPrototypeStack } from '../lib/aws-cdk-prototype-stack';

const app = new cdk.App();
new AwsCdkPrototypeStack(app, 'AwsCdkPrototypeStack');
