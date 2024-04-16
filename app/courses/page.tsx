'use client'
import { Box, Center, Image, Text } from '@mantine/core'
import React from 'react'

const CoursesPage = () => {
    return (
        <Box>
            <Center
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <Image
                    alt="in-progress"
                    height={200}
                    src="/assets/inprogess.svg"
                    width={200}
                />
                <Text>
                    We are working on courses.It will be available soon. Until
                    then enjoy blogs.
                </Text>
            </Center>
        </Box>
    )
}

export default CoursesPage
