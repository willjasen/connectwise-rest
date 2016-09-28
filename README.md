# connectwise-rest
A nodejs module for interacting with the ConnectWise REST API.   This module is currently under construction.  This module provides bindings for ease of development against the ConnectWise REST API. 

## Requirements

- ConnectWise 2015.3+, though these functions are written for ConnectWise 2016.1 APIs (API3.0 v1.0.0). 
- ConnectWise API keys (available on ConnectWise 2015.3+), or API Only Member keys (only available on ConnectWise 2015.6+).  See the [documentation](https://developer.connectwise.com/Authentication) for more details. 

## Documentation

See the documentation [here](https://github.com/covenanttechnologysolutions/connectwise-rest/blob/master/doc.md)

## Usage

Create a new API key, or API Only Member, then instantiate the module.  

```javascript
    
    var ConnectWiseRest = require('connectwise-rest');
    
    var cw = new ConnectWiseRest({
        companyId: 'company',
        companyUrl: 'your.connectwise.com',
        publicKey: '<public key>',
        privateKey: '<private key>'
    });
    
    cw.ServiceDeskAPI.Tickets.getTicketById(1234)
        .then(function (result){
            //do something with results
        })
        .fail(function (error){
            //handle errors
        });
```

Or if you only require access to one API component:

```javascript

    var ConnectWiseRest = require('connectwise-rest');
    
    var tickets = new ConnectWiseRest(options).ServiceDeskAPI.Tickets;
    
    tickets.getTicketById(1234)
        .then(function (result){
            //do something with results
        })
        .fail(function (error){
            //handle errors
        });
```

You can also manually access the API:

```javascript

    var ConnectWiseRest = require('connectwise-rest');

    var api = new ConnectWiseRest(options).API.api;

    api('/path/to/api', 'POST', {
        'param1': 'val1',
        'param2': 'val2'
    }).then(function (result){
        //do something with results
    })
    .fail(function (error){
        //handle errors
    });
```

### Cloud-Hosted ConnectWise 

To access cloud-hosted ConnectWise, use the `companyUrl` of `api-na.myconnectwise.net` and override the default `entryPoint`.

```javascript
    options = {
        companyId: 'company',
        companyUrl: 'api-na.myconnectwise.net',
        entryPoint: 'v2016_2'
        publicKey: '<public key>',
        privateKey: '<private key>'
    }

```


## Implemented APIs

| Module           | API                 | Status                        |
| ---------------- | ------------------- | ----------------------------- |
| Company API      | Companies           | In Progress                   |
| Company API      | Contacts            | In Progress                   |
| Finance API      | Additions           | Complete                      |
| Finance API      | Adjustments         | Complete                      |
| Finance API      | Agreements          | Complete                      |
| Finance API      | AgreementSites      | Complete                      |
| Finance API      | BoardDefaults       | Complete                      |
| Finance API      | WorkRoles           | Complete                      |
| Finance API      | WorkTypeExclusions  | Complete                      |
| Finance API      | WorkTypes           | Complete                      |
| Project API      | Projects            | In Progress                   |
| Service Desk API | Boards              | Complete                      |
| Service Desk API | Tickets             | Complete                      |
| Service Desk API | Statuses            | Complete                      |
| Service Desk API | ServiceNotes        | Complete                      |
| System API       | Documents           | In Progress                   |
| Time API         | TimeEntries         | Complete                      |


## Examples

### Code Examples

Get ticket 1234 and print ticket number, summary and status. 

```javascript

    tickets.getTicketById(1234)
        .then(function (res) { console.log(res.id, res.summary, res.status.name); })
        .fail(function (err) { console.log(err); });
```

Create new ticket on service board, then print the returned ticket number, or any errors

```javascript

    tickets.createTicket({
        summary: "This is the summary",
        board: {
            name: "Service Board"
        },
        company: {
            identifier: "ABC" //company ID
        },
        initialDescription: "ticket description",
        recordType: "ServiceTicket"
        //can also pass in any other Ticket object settings as needed
    })
    .then(function (res) { console.log(res.id); });
    .fail(function (err) { console.log(err); });    
    
```

Change the status of a ticket

```javascript

    updateTicket(1234, [{
        op: 'replace',
        path: 'status/id',
        value: 123 //id of the status to change to, find with boards.getBoards and status.getStatuses
    }, {
        //second or more operations
    }])
    .then(function(res) { //do something with returned ticket });
    .fail(function(err) { //do something with errors });    

```

### Conditions 

Valid example conditions string
  
```javascript

    var conditions = '(contact/name like "Fred%" and closedFlag = false) and dateEntered > [2015-12-23T05:53:27Z] or summary contains "test" AND  summary != "Some Summary"'

```
