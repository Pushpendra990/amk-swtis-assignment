# Access Key Management and Token Information Retrieval System

## Overview
This system consists of two microservices:
1. **Access Key Management Service** - Responsible for generating and managing access keys for users and administrators.
2. **Web3 Token Information Service** - Allows users to retrieve Web3 token information based on their access keys while respecting rate limits and expiration times.


## Microservice 1: Access Key Management Service
### Objective:
This service is responsible for generating access keys, setting rate limits, defining expiration times, and providing administrative capabilities to manage keys. It also allows users to fetch their plan details by querying with their access keys.

### Core Features:
#### 1. **Key Generation:**
- **Functionality:** Admins can generate access keys for users.
- **Parameters:** The generated keys come with:
  - **Rate Limit:** Defines how many requests a user can make per minute.
  - **Expiration Time:** Defines how long the key is valid.

#### 2. **Admin Commands:**
- **Create Key:** Admins can create new access keys with specified rate limits and expiration times.
- **Delete Key:** Admins can delete existing keys.
- **Update Key:** Admins can modify the rate limit or expiration time of an existing key.
- **List Keys:** Admins can list all existing access keys.

#### 3. **User Queries:**
- **Fetch Plan Details:** Users can use their access key to fetch their plan details (rate limit, expiration).
- **Disable Key:** Users can disable their key through an API call if needed.

### Authentication:
- **Admin Authentication:** Admin authentication is handled using JWT tokens, but there is no need for an additional user authentication system.

## Microservice 2: Web3 Token Information Service

### Objective:
This service allows users to retrieve Web3 token information (e.g., token price, market cap, etc.) from a third-party service like CoinGecko, using their valid access keys. The service respects the rate limits and expiration times of the access keys.

### Core Features:

#### 1. **Token Information Retrieval:**
- **Functionality:** Provides an endpoint to fetch token information.
- **Example Data:** Token details (mock or static data) can be fetched, focusing on access control rather than token data.

#### 2. **Rate Limit Enforcement:**
- **Functionality:** The service checks the user’s request rate against their access key's rate limit.
- **Error Response:** If the rate limit is exceeded, the service returns a rate-limiting error response.

#### 3. **Key Validation:**
- **Functionality:** Verifies whether the user’s access key is valid and has not expired before allowing access to token information.

#### 4. **Logging:**
- **Functionality:** Optionally logs each request, including:
  - Access key used
  - Timestamp of the request
  - Whether the request was successful or rate-limited.

---

## Technologies Used

### 1. **NestJS
- The system is built using either **NestJS** for implementing the two microservices.
  



## Architecture

### Service Architecture:

1. **Access Key Management Service:**
   - Exposes endpoints for key creation, deletion, and management.
   - Admins interact with this service through JWT authentication.
   - Provides endpoints for users to query their access plans and disable keys.

2. **Web3 Token Information Service:**
   - Exposes endpoints for token information retrieval, validating access keys before allowing requests.
   - Enforces rate limits and handles expired keys.

### Communication Between Services:
- The **Access Key Management Service** provides access keys and rate limits for users.
- The **Web3 Token Information Service** validates keys and enforces rate limits before fetching token information.


### Installation:

- AKMS-WTIS 
    - akms 
       - npm install
       - npm run start // http://localhost:3000
    wtis 
     - npm install
     - npm run start // http://localhost:3001