import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john-doe@gmail.com',
            avatarUrl: 'https://github.com/rhanielmx.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            userId: user.id,
            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-02T18:00:00.473Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'DE',
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.473Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',
            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 0,
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })  
}

main()