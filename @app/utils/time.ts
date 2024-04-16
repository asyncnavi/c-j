export const parseTimeToReadableString = (timestamp: string) =>
    new Date(timestamp).toLocaleDateString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

export const isSameMinute = (timestamp1: string, timestamp2: string) => {
    const time1 = parseTimeToReadableString(timestamp1)
    const time2 = parseTimeToReadableString(timestamp2)

    const hour1 = time1.split(':')[0]
    const hour2 = time2.split(':')[0]

    if (hour1 === hour2) {
        const minute1 = time1.split(':')[1]
        const minute2 = time2.split(':')[1]

        if (minute1 === minute2) {
            return minute1?.[1] === minute2?.[1]
        }
        return false
    }
    return false
}
