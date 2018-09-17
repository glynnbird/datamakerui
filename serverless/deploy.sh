#!/bin/bash
zip -r deploy.zip index.js node_modules
ibmcloud cloud-functions action update datamaker --kind nodejs:8 deploy.zip --web true
rm deploy.zip
ibmcloud cloud-functions action get datamaker --url
