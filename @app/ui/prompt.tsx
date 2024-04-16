import { showNotification } from '@mantine/notifications'

export const promptError = (error: string | undefined) => {
    if (error) {
        showNotification({
            message: error.toString() ?? '',
            color: 'red',
            autoClose: 3000,
        })
    }
}

export const promptSuccess = (message: string) => {
    if (message) {
        showNotification({
            message: message ?? '',
            color: 'green',
            autoClose: 1200,
        })
    }
}
