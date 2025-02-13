# Get the filename from a Terraform variable (e.g., timestamp-based)
FILENAME="dist.zip"

# Backend Build
cd backend || exit

[ -f "$FILENAME" ] && rm "$FILENAME"

# Install production dependencies and build
#npm install --production
npm install
npm run build

# Create the zip file dynamically
zip -r $FILENAME dist node_modules package.json

# Frontend Build
# Build the React App with Vite
cd ../frontend || exit
export VITE_API_URL=$(terraform -chdir=../infra output -raw api_url)
echo "VITE_API_URL=$VITE_API_URL" > .env
npm run build
aws s3 sync dist/ s3://card-validator-frontend/


# Terraform Apply
cd ../infra || exit
terraform init
terraform apply -auto-approve
