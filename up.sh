#options
BACKEND_ARCHIVE="dist.zip"

# == Backend Build ==

cd backend || exit
[ -f "$BACKEND_ARCHIVE" ] && rm "$BACKEND_ARCHIVE"

# install production dependencies and build
npm install
npm run build

# create the zip file dynamically
zip -r $BACKEND_ARCHIVE dist node_modules package.json


# == Frontend Build ==

cd ../frontend || exit

# get backend api url for use with static frontend
export VITE_API_URL=$(terraform -chdir=../infra output -raw api_url)
echo "VITE_API_URL=$VITE_API_URL" > .env

# install production dependencies and build
npm install
npm run build
aws s3 sync dist/ s3://card-validator-frontend/


# Terraform Apply
cd ../infra || exit
terraform init
terraform apply -auto-approve
