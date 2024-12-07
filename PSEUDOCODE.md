# Portable Node.js Web Application - System Architecture

## Overview
This is a portable Node.js web application that implements a CRUD (Create, Read, Update, Delete) interface for managing items. The application follows a client-server architecture with a RESTful API backend and a responsive frontend.

## System Components

### 1. Backend Architecture (server.js)
```pseudocode
INITIALIZE Express Server
    SET CORS to allow all origins
    SET body-parser for JSON
    SET static file serving for 'public' directory
    SET port to 3000

INITIALIZE Data Storage
    IF data.json doesn't exist
        CREATE empty data.json file
    ENDIF

DEFINE API Endpoints
    1. GET /api/items
        READ data from data.json
        RETURN JSON response with all items
    
    2. POST /api/items
        READ current data
        CREATE new item with
            id = current timestamp
            name = request body name
            category = request body category
        APPEND new item to data
        WRITE updated data to file
        RETURN new item
    
    3. DELETE /api/items/:id
        READ current data
        FILTER OUT item with matching id
        WRITE updated data to file
        RETURN success message
    
    4. PUT /api/items/:id
        READ current data
        FIND item index with matching id
        IF item found
            UPDATE item with new data
            WRITE to file
            RETURN updated item
        ELSE
            RETURN 404 error
        ENDIF

START Server
    LISTEN on port 3000
    LOG server start message
```

### 2. Frontend Architecture

#### 2.1 HTML Structure (index.html)
```pseudocode
DEFINE Document Structure
    HEAD
        SET viewport and character encoding
        LOAD Bootstrap CSS
    
    BODY
        DEFINE Container
            RENDER Add Item Form
                INPUT field for name
                INPUT field for category
                SUBMIT button
            
            RENDER Items Table
                HEADERS: Name, Category, Actions
                DYNAMIC tbody for items
            
            DEFINE Edit Modal
                INPUT fields for name and category
                SAVE and CLOSE buttons
        
        LOAD Bootstrap JS
        LOAD Application JS
```

#### 2.2 Frontend Logic (app.js)
```pseudocode
ON Document Load
    CALL loadItems()
    
    HANDLE Add Form Submit
        PREVENT default form action
        GET name and category values
        SEND POST request to /api/items
        IF success
            RESET form
            RELOAD items
        ENDIF
    
    HANDLE Save Edit Click
        GET edited values
        SEND PUT request to /api/items/:id
        IF success
            CLOSE modal
            RELOAD items
        ENDIF

FUNCTION loadItems()
    FETCH items from /api/items
    CALL displayItems with response

FUNCTION displayItems(items)
    CLEAR table body
    FOR EACH item
        CREATE table row
        SET item data
        ADD edit and delete buttons
        APPEND to table
    END FOR

FUNCTION editItem(id, name, category)
    SET modal input values
    SHOW edit modal

FUNCTION deleteItem(id)
    IF user confirms deletion
        SEND DELETE request to /api/items/:id
        IF success
            RELOAD items
        ENDIF
    ENDIF
```

## Data Flow

```pseudocode
1. Data Storage
    DATA STRUCTURE in data.json:
    [
        {
            id: number (timestamp),
            name: string,
            category: string
        },
        ...
    ]

2. Request/Response Flow
    CREATE Item:
        Frontend → POST /api/items → Backend
        Backend → Update data.json → Response → Frontend Update
    
    READ Items:
        Frontend → GET /api/items → Backend
        Backend → Read data.json → Response → Frontend Display
    
    UPDATE Item:
        Frontend → PUT /api/items/:id → Backend
        Backend → Update data.json → Response → Frontend Update
    
    DELETE Item:
        Frontend → DELETE /api/items/:id → Backend
        Backend → Update data.json → Response → Frontend Update
```

## Setup and Initialization

```pseudocode
INITIALIZATION Process:
    1. download-nodeRE+nodeMods-and-generate-localnodescript.sh
        DOWNLOAD Node.js runtime
        INSTALL required node modules
        GENERATE startup script
    
    2. start-webapp.sh
        START Node.js server
        SERVE application on port 3000

DEPENDENCIES:
    - express: Web server framework
    - body-parser: Request body parsing
    - cors: Cross-origin resource sharing
    - Bootstrap: Frontend styling and components
```

## Security Considerations
```pseudocode
IMPLEMENTED Security Measures:
    - CORS configuration for API access control
    - Input validation on both client and server
    - Proper error handling and status codes
    - No sensitive data exposure

POTENTIAL ENHANCEMENTS:
    - Add authentication/authorization
    - Implement rate limiting
    - Add input sanitization
    - Implement HTTPS
```

## Error Handling
```pseudocode
Frontend Error Handling:
    TRY-CATCH blocks for all API calls
    Console error logging
    User-friendly error messages

Backend Error Handling:
    File system operation error handling
    Invalid request handling
    404 responses for not found items
    500 responses for server errors
```
