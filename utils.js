export const getChatMessages = (data) => {
    return data ? Object.keys(data).map(key => data[key]) : []
}

export const makeEventsArray = (data) => {
    return data ? Object.keys(data).map(key => data[key]) : []
}