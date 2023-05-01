'use strict';
const AWS = require('aws-sdk');

module.exports.getPeople = async (event, callback) => {
  const scanParams = {
    TableName: process.env.DYNAMODB_CUSTOMER_TABLE,
  };

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan(scanParams).promise();

  if (result.Count === 0) {
    return {
      statusCode: 404,
      body: "No phonebook item exists."
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(await result.Items)
  };
};
