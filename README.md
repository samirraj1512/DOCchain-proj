# DOC-Chain Frontend
>The Complete Solution to the Digital Identity Problem. 

---

## Installation

- Step 1: Clone this repository into your local machine. (See [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository))
- Step 2: Install all the dependencies. 
```bash
npm install
```
- Step 3: Run the React server.
```bash
npm start
```
---

## Backend
The const folder inside the src folder contains the addresses of all the smart contracts. We don't have any backend other than three contracts already deployed on the blockchain.

---

## Screens

### Home Screen
This screen holds the main structure of the website. It contains different options to perform different tasks to request and send claims to other users or receive and send information to other users. This screen contains the AVATAR for the person, which is made by using GenAI

![Home1](https://github.com/guptaaditya30121/thirdweb-app/blob/master/img/Home1.png)
![Home2](https://github.com/guptaaditya30121/thirdweb-app/blob/master/img/Home2.png)
![Home3](https://github.com/guptaaditya30121/thirdweb-app/blob/master/img/Home3.png)



### Docker Screen
This screen gives you all the documents uploaded by you, you can upload more documents to it. For managing documents, I have used IPFS as storing big files on the Blockchain is expensive

![ipfs1](https://github.com/guptaaditya30121/thirdweb-app/blob/master/img/ipfs1.png)


### Voter Screen
It offers the option to create a new poll and displays all the polls in our contract along with their results. This ensures there is no tampering mechanism by not revealing which users have voted for which option.

![Voting1](https://github.com/guptaaditya30121/thirdweb-app/blob/master/img/Voting1.png)


### Building Access Screen
This screen displays all your permanent properties, as well as any temporary ones (i.e., properties to which someone else has granted you access for a limited time). From this screen, you can manage all your properties, including those to which you have access. Additionally, you can check who has entered your property using the form in the bottom left corner 

![Property1](https://github.com/guptaaditya30121/thirdweb-app/blob/master/img/Property1.png)
![Property2](https://github.com/guptaaditya30121/thirdweb-app/blob/master/img/Property2.png)


### dotenv
Create a .env file and place your clientId of the third-web account in REACT_APP_TEMPLATE_CLIENT_ID. To obtain your private key, sign in to your third-web account, then navigate to settings > API Key and create the API Key. Afterwards, copy and paste the client ID.
(REACT_APP_TEMPLATE_CLIENT_ID = cc68726829403494c9bffbba85d514de).
[GenAI api](https://stablediffusionapi.com/), Go to this website, Login and go to the dashboard. Go to settings and generate your api key
and copy and paste this api key to the env file in STABLE_API


## Additional Resources

- [Documentation](https://portal.thirdweb.com)
- [Templates](https://thirdweb.com/templates)
- [Video Tutorials](https://youtube.com/thirdweb_)
- [Blog](https://blog.thirdweb.com)

# DocChain Backend

### Table of Contents


  - [Description](#description)
      - [Key Features](#key-features)
      - [Technologies](#technologies)
  - [Installation](#installation)

---

## Description


### Access Security System
The AccessSecuritySystem contract manages property access in a decentralized environment. Users can own and grant access to properties with specified expiration times. Key features include property creation, ownership tracking, and access management.

### Claims Contract
The ClaimsContract facilitates secure information exchange on the blockchain. Users can make claims, request information, and respond to requests. The contract manages received information and allows users to assert ownership of documents.

### Voting
The DecisionVoting contract enables the creation of voting polls with predefined options and eligible voters. Users can cast votes, and the contract provides functionality to check poll results, including the winning option and total votes.

---

#### Key Features
Some features of these contracts are:-

- Decentralized management of property access.
- Handles claims, requests, and ownership of documents.
- Enables the creation of voting polls with predefined options.


---

#### Technologies

- Back End: Solidity.

---
# Installation

First git clone it or download the zip

## Installing dependencies

```bash
npm install
```
ignore the warnings

## dotenv

Create a .env file and put your private key of the metamask account 
```bash
PRIVATE_KEY={@your private key}
```


## deployment

```bash
npm run deploy
```



<!--## Getting Started

First git clone it or download the zip
```bash
git clone https://github.com/Rashaad10/DocChain.git
```

## Installing dependencies

```bash
npm install
```
ignore the warnings

## dotenv

Create a .env file and put your private key of the metamask account 
```bash
PRIVATE_KEY={@your private key}
```


## deployment

```bash
npm run deploy
```
-->


<!---->
