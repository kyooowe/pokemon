//#region Import
import { Card, Image, Text, Group, Badge, Button, ActionIcon, createStyles, Loader, Skeleton } from '@mantine/core';
import React, { Dispatch, useState } from 'react';
import { useQuery } from 'react-query';
import { Heart } from 'tabler-icons-react';
import { IPCard } from '../interface/PCard';
import { motion } from "framer-motion";
import { IPokemonBasic } from '../interface/Pokemon';
import { pokemonService } from '@/pages/api/pokemonService';

const { fetchPokemon } = pokemonService;
//#endregion

//#region Styles
const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));
//#endregion

const PCard = ({ name, url, loading, setLoading }: IPokemonBasic) => {

    //#region State Helper
    const { classes, theme } = useStyles();
    //#endregion

    //#region Queries
    const { data, isLoading } = useQuery<IPCard>(name.toUpperCase(), () => fetchPokemon(url))

    if (isLoading) setLoading(true)
    //#endregion

    //#region Helper
    const PokemonImg = (img: string | undefined) => {
        if (img === null || img === undefined)
            return "/pokeball.png"
        else
            return img;
    }

    const PokemonTypeBadgeColor = (type: string) => {
        if (type === 'FIRE')
            return 'red'

        if (type === 'WATER')
            return 'indigo'

        if (type === 'BUG')
            return 'teal'

        if (type === 'DARK')
            return 'dark'

        if (type === 'DRAGON')
            return 'green'

        if (type === 'ELECTRIC')
            return 'yellow'

        if (type === 'FAIRY')
            return 'pink'

        if (type === 'FIGHTING')
            return 'orange'

        if (type === 'FLYING')
            return 'gray'

        if (type === 'GHOST')
            return 'violet'

        if (type === 'GRASS')
            return 'green'

        if (type === 'GROUND')
            return 'orange'

        if (type === 'ICE')
            return ''

        if (type === 'POISON')
            return 'violet'

        if (type === 'PSYCHIC')
            return 'grape'

        if (type === 'ROCK')
            return 'gray'

        if (type === 'STEEL')
            return 'gray'

        if (type === 'NORMAL')
            return 'black'
    }

    const EmojiHelper = (type: string) => {
        if (type === 'FIRE')
            return '🔥'

        if (type === 'WATER')
            return '🌊'

        if (type === 'BUG')
            return '🪲'

        if (type === 'DARK')
            return '🌙'

        if (type === 'DRAGON')
            return '🐉'

        if (type === 'ELECTRIC')
            return '⚡'

        if (type === 'FAIRY')
            return '🧚'

        if (type === 'FIGHTING')
            return '👊🏽'

        if (type === 'FLYING')
            return '🦅'

        if (type === 'GHOST')
            return '👻'

        if (type === 'GRASS')
            return '🌿'

        if (type === 'GROUND')
            return '🧱'

        if (type === 'ICE')
            return '❄️'

        if (type === 'POISON')
            return '☠️'

        if (type === 'PSYCHIC')
            return '🔮'

        if (type === 'ROCK')
            return '🪨'

        if (type === 'STEEL')
            return '🛡️'

        if (type === 'NORMAL')
            return '💢'
    }

    const features = data?.types.map((e) => (
        <Badge
            color={PokemonTypeBadgeColor(e.type.name.toUpperCase())}
            key={e.type.name}
            leftSection={EmojiHelper(e.type.name.toUpperCase())}
        >
            {e.type.name}
        </Badge>
    ));
    //#endregion

    return (
        <>
            {
                loading ? (
                    <Card withBorder radius="md" p="md" className={classes.card} key={data?.id}>
                        <Card.Section>
                            <Skeleton height={200} />
                        </Card.Section>

                        <Card.Section className={classes.section} mt="md">
                            <Group position="apart">
                                <Skeleton height={30} />
                            </Group>
                        </Card.Section>

                        <Card.Section className={classes.section} mt={15}>
                            <Skeleton height={30} />
                        </Card.Section>

                        <Group mt="xs">
                            <Skeleton height={30} />
                        </Group>
                    </Card>
                ) : (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                        <Card withBorder radius="md" p="md" className={classes.card} key={data?.id}>
                            <Card.Section sx={{ backgroundImage: 'url(/poke-bg.jpg)', backgroundSize: 'cover' }}>
                                <Image imageProps={{ loading: "lazy" }} src={PokemonImg(data?.sprites.front_default)} alt={name} height={200} fit="contain" />
                            </Card.Section>

                            <Card.Section className={classes.section} mt="md">
                                <Group position="apart">
                                    <Text size="lg" weight={500} truncate>
                                        {data?.name.toUpperCase()}
                                    </Text>
                                </Group>
                            </Card.Section>

                            <Card.Section className={classes.section}>
                                <Text mt="md" className={classes.label} color="dimmed">
                                    Pokemon Type
                                </Text>
                                <Group spacing={7} mt={5}>
                                    {features}
                                </Group>
                            </Card.Section>

                            <Group mt="xs">
                                <Button radius="md" style={{ flex: 1 }}>
                                    Show details
                                </Button>
                            </Group>
                        </Card>
                    </motion.div>
                )
            }
        </>
    );
}

export default PCard;