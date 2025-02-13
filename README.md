# creditcard-validator


## Demo
Try the validator out now!
1. **Visit the demo site: https://d2smo6zr9j53ei.cloudfront.net**
2. Start typing a credit card number

<img src="https://github.com/user-attachments/assets/d144c902-7cd8-40df-98f4-2556d6b850d5" width="70%" />



Or try calling the backend directly:
```bash
curl 'https://4zi58jxkw7.execute-api.us-east-1.amazonaws.com/api/validateCreditCard' -X POST -H 'Content-Type: application/json' -s --data-raw '{"number":"6011000990139424","expirationDate":"12/29","cvc":"000"}'
```
Example result:
```json
{
  "isValid": true,
  "details": [
    {
      "label": "American Express",
      "isValid": false,
      "errors": [
        "Invalid card number length",
        "Invalid card number prefix"
      ]
    },
    {
      "label": "Diners Club",
      "isValid": false,
      "errors": [
        "Invalid card number length",
        "Invalid card number prefix"
      ]
    },
    {
      "label": "Discover",
      "isValid": true,
      "errors": []
    },
    {
      "label": "MasterCard",
      "isValid": false,
      "errors": [
        "Invalid card number prefix"
      ]
    },
    {
      "label": "Visa",
      "isValid": false,
      "errors": [
        "Invalid card number prefix"
      ]
    }
  ]
}

```


## Structure
The project is divided into three folders / apps:

* backend
    * **Purpose**: hosts REST API with credit card validator endpoint
    * **Tech**: Node + Express app, run via AWS Lambda
* frontend
    * **Purpose**: hosts UI to demo validation service
    * **Tech**: React app, run via AWS Cloudfront + S3
* infra
    * Terraform IAC to deploy both apps
    

### Points of Interest
* [rules.ts](https://github.com/devnet-io/creditcard-validator/blob/main/backend/src/validation/rules.ts) - Defines rules for validating different types of credit cards
* [cardValidator.ts](https://github.com/devnet-io/creditcard-validator/blob/main/backend/src/validation/cardValidator.ts) - Logic to apply the validation rules to the card details


## Deployment
This project is intended to be deployed to AWS.

Deployment instructions:
1. Install [Terraform](https://developer.hashicorp.com/terraform/install?product_intent=terraform) and the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. Go through the authentication flow for the AWS CLI. Ensure the user/session has the necessary permissions.
   * Example permissions needed (illustrative only, this is insecure):
    ![image](https://github.com/user-attachments/assets/f967c218-2a5f-4624-b2b2-fe189f5490a5)

3. Run ```bash up.sh```


That's it! Terraform will take care of creating the resources and will output URLs for the backend and frontend projects when its finished:

## Testing
Run the tests via jest:
```bash
cd backend
npm install
npm run tests
```

Example results:
![image](https://github.com/user-attachments/assets/df2a13e1-ed97-441b-8f92-28cec9e6b75e)


## Unfinished Business
* Input validation for APIs
* Error handling for APIs
* More reasonable unit test coverage (single "integration" test exists)
* Refine frontend components, seperate into presentational components and logic ones
