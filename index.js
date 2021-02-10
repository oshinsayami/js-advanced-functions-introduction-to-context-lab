// Your code here
let createEmployeeRecord = function (arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (empArr){
    return empArr.map(function(arr){
        return createEmployeeRecord(arr)
    })
}

let createTimeInEvent = function (emp, time){
    let [date, hour] = time.split(' ')
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return emp
}

let createTimeOutEvent = function (emp, time){
    let [date, hour] = time.split(' ')
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return emp
}

let hoursWorkedOnDate = function (emp , inDate){
    let inEvent = emp.timeInEvents.find(function(e){
        return e.date === inDate
    })

    let outEvent = emp.timeOutEvents.find(function(e){
        return e.date === inDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
    let rawWage = hoursWorkedOnDate(employee, dateSought)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}