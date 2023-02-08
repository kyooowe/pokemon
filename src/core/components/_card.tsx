//#region Import
import { Card, Image, Text, Group, Badge, Button, ActionIcon, createStyles, Loader, Skeleton } from '@mantine/core';
import React, { Dispatch, useState } from 'react';
import { useQuery } from 'react-query';
import { Heart } from 'tabler-icons-react';
import { IPCard } from '../interface/PCard';
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import { IPokemonBasic } from '../interface/Pokemon';
import { helpers } from '../helpers/helper';
import { pokemonService } from '@/pages/api/pokemonService';

const { fetchPokemon } = pokemonService;
const { getProperPokemonBadgeColor, getProperPokemonBadgeEmoji, getProperPokemonImg } = helpers
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
    const router = useRouter();
    //#endregion

    //#region Queries
    const { data, isLoading } = useQuery<IPCard>(name.toUpperCase(), () => fetchPokemon(url))

    if (isLoading) setLoading(true)

    /**
     * @remarks
     * This function is for create Array of DOM and add data base on items map
     *
     * @param e - item itself
     * @param i - item index
     * @returns DOM Array with data
     */
    const features = data?.types.map((e, i) => (
        <Badge
            color={getProperPokemonBadgeColor(e.type.name.toUpperCase())}
            key={i}
            leftSection={getProperPokemonBadgeEmoji(e.type.name.toUpperCase())}
        >
            {e.type.name}
        </Badge>
    ));
    //#endregion

    //#region Handle
    const handleShowDetails = () => {
        router.push(`/pokemon-details?name=${data?.name}`)
    }
    //#endregion

    return (
        <>
            {
                loading ? (
                    <Card withBorder radius="md" p="md" className={classes.card}>
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
                                <Image imageProps={{ loading: "lazy" }} src={getProperPokemonImg(data?.sprites.front_default)} alt={name} height={200} fit="contain" />
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
                                <Button radius="md" style={{ flex: 1 }} onClick={handleShowDetails}>
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