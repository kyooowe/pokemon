//#endregion Import
import AppLayout from "@/core/layout";
import { ReactElement, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { createStyles, Flex, Image, Title, Badge, Group, Grid, useMantineTheme, Avatar, Paper, Center, Accordion, Text, Kbd, Container, Divider, ScrollArea } from '@mantine/core';
import { useQuery } from 'react-query'
import { useRouter } from "next/router";
import { IPCard } from "@/core/interface/PCard";
import { useMediaQuery } from "@mantine/hooks";
import { IAccordionDetails, IPokemonDetails } from "@/core/interface/Pokemon";
import { helpers } from "@/core/helpers/helper";
import { pokemonService } from "../api/pokemonService";
import MoveSetModal from "@/core/components/_moveSetModal";

const { fetchPokemonByName, fetchPokemonSpeciesDetailsByName } = pokemonService;
const { getProperPokemonImg, getProperPokemonBadgeColor, getProperPokemonBadgeEmoji, generateRandomColor } = helpers
//#endregion

//#region Styles
const useStyles = createStyles((theme) => ({
    card: {
        height: 350,
        width: '100%'
    },

    flex: {
        height: '100%'
    },

    accordionGrid: {

        // Media query with value from theme
        [`@media (max-width: ${theme.breakpoints.xs}px)`]: {

            // Assign margin here if mobile view is not responsive
        },
    },

    accordionPanel: {
        backgroundColor: "#ffffff"
    },

    paperSpan: {
        fontWeight: 300,
        fontSize: 15
    },

    statsContainer: {
        marginTop: 10
    }
}));
//#endregion

const Page: NextPageWithLayout = () => {

    //#region State Helper
    const { classes } = useStyles();
    const router = useRouter();
    const theme = useMantineTheme();

    // Add max-width when mobile view
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    // Get Params in URL
    const name = router.query["name"];
    //#endregion

    //#region State

    // Moveset Modal State
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [modalUrl, setModalUrl] = useState<string>("")
    const [modalTitle, setModalTitle] = useState<string>("")
    //#endregion

    //#region Helper
    /**
     * @remarks
     * multiple functions for getting proper data for usage
     *
     * @function getProperNameString - get proper pokemon name as string and also uppercase string
     * @function getProperNameStringLowerCase - get proper pokemon name as string and also lowercase string
     * @function getProperStatName - get proper string for the pokemon stats, just shorten the special-attack and special-defense
     */
    const getProperNameString = () => {
        if (name === undefined)
            return "";
        else
            return name.toString().toUpperCase();
    }

    const getProperNameStringLowerCase = () => {
        if (name === undefined)
            return "";
        else
            return name.toString().toLocaleLowerCase();
    }

    const getProperStatName = (name: string) => {
        if (name === "special-attack")
            return "SP. ATK"
        else if (name === "special-defense")
            return "SP. DEF"
        else
            return name.toUpperCase()
    }
    //#endregion

    //#region Queries

    // Get Pokemon 
    const { data, isLoading } = useQuery<IPCard>(getProperNameString(), () => fetchPokemonByName(getProperNameStringLowerCase()))

    // Get Pokemon Species Details
    const pokemonSpeciesDetails = useQuery<IPokemonDetails>(`${getProperNameString()}-species-details`, () => fetchPokemonSpeciesDetailsByName(getProperNameStringLowerCase()))

     //#region Helper
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

    const abilities = data?.abilities.map((e, i) => (
        <Badge
            color={generateRandomColor()}
            key={i}
        >
            {e.ability.name}
        </Badge>
    ))

    const stats = data?.stats.map((e, i) => (
        <Grid.Col span={4} key={i}>
            <Center>
                <Text fw={700}>{getProperStatName(e.stat.name)}</Text>
            </Center>
            <Center>
                <Text c="black">{e.base_stat}</Text>
            </Center>
        </Grid.Col>
    ))

    const moves = data?.moves.map((e, i) => (
        <Grid.Col span={1}>
            <Badge
                color={generateRandomColor()}
                key={i}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleMoveBadgeClick(e.move.url, e.move.name)}
            >
                {e.move.name}
            </Badge>
        </Grid.Col>
    ))
    //#endregion

    //#region Reusable Components
    /**
     * @remarks
     * This is a custom component for accordion control
     *
     * @param label - title of the component
     * @param description - description of the component
     * @returns TSX element 
     */
    const AccordionPlainDetails = ({ label, description }: IAccordionDetails) => {
        return (
            <Group noWrap>
                <Avatar src="/pokeball.png" radius="xl" size="lg" />
                <div>
                    <Text>{label}</Text>
                    <Text size="sm" color="dimmed" weight={400}>
                        {description}
                    </Text>
                </div>
            </Group>
        )
    }
    //#endregion

    //#region Handle
    const handleMoveBadgeClick = (url: string, title: string) => {
        setModalUrl(url)
        setModalTitle(title)
        setModalShow(true)
    }
    //#endregion

    return (
        <>
            <MoveSetModal show={modalShow} setShow={setModalShow} url={modalUrl} title={modalTitle} />
            <Paper shadow="sm" radius="lg" p="lg" withBorder>
                <Text><b>Keyboard Shortcuts</b><span className={classes.paperSpan}> (under experimentation)</span></Text>
                <Grid columns={12} mt={15}>
                    <Grid.Col xs={6} sm={6} md={6} lg={6}>
                        <Center>
                            <Flex
                                mih={50}
                                gap="md"
                                justify="flex-start"
                                align="flex-start"
                                direction="row"
                                wrap="wrap"
                            >
                                <Kbd>Ctrl</Kbd> + <Kbd>→</Kbd>
                                <Text>=</Text>
                                <Text>Next Pokemon</Text>
                            </Flex>
                        </Center>
                    </Grid.Col>
                    <Grid.Col xs={6} sm={6} md={6} lg={6}>
                        <Center>
                            <Flex
                                mih={50}
                                gap="md"
                                justify="flex-start"
                                align="flex-start"
                                direction="row"
                                wrap="wrap"
                            >
                                <Kbd>Ctrl</Kbd> + <Kbd>←</Kbd>
                                <Text>=</Text>
                                <Text>Prev Pokemon</Text>
                            </Flex>
                        </Center>
                    </Grid.Col>
                </Grid>
            </Paper>

            <Grid columns={12} mt={10}>
                <Grid.Col xs={6} sm={6} md={6} lg={6} sx={{ height: 470 }}>
                    <Center>
                        <Paper
                            radius="md"
                            shadow="sm"
                            sx={{ backgroundImage: `url(/poke-bg.jpg)` }}
                            withBorder
                            className={classes.card}
                        >
                            <Flex
                                className={classes.flex}
                                mih={50}
                                gap="md"
                                justify="center"
                                align="center"
                                direction="row"
                                wrap="wrap"
                            >
                                <Image imageProps={{ loading: "lazy" }} fit="contain" src={getProperPokemonImg(data?.sprites.other.dream_world.front_default)} alt={getProperNameString()} width={250} height={200} />
                            </Flex>
                            <Paper
                                radius="md"
                                shadow="sm"
                                p="sm"
                                mt={15}
                                withBorder
                            >
                                <Title order={5} weight={600}>{getProperNameString()} - (Pokémon)</Title>
                                <Group spacing={7} mt={10}>
                                    {features}
                                </Group>
                            </Paper>
                        </Paper>
                    </Center>
                </Grid.Col>
                <Grid.Col xs={6} sm={6} md={6} lg={6} className={classes.accordionGrid}>

                    {/* Add defaultValue="value of item" to add default opened item */}
                    <Accordion chevronPosition="right" variant="contained">

                        {/* Details */}
                        <Accordion.Item value="Details">
                            <Accordion.Control>
                                <AccordionPlainDetails label="Details" description={`A pieces of information or fact about pokemon ${getProperNameString()}.`} />
                            </Accordion.Control>
                            <Accordion.Panel className={classes.accordionPanel}>

                                {/* Abilities */}
                                <div>
                                    <Center>
                                        <Text fw={700}>Abilities</Text>
                                    </Center>
                                    <Center>
                                        <Group spacing={7} mt={10}>
                                            {abilities}
                                        </Group>
                                    </Center>
                                </div>
                                <Divider mt={25} />

                                {/* Body Mass */}
                                <div>
                                    <Center mt={15}>
                                        <Text fw={700}>Body Mass</Text>
                                    </Center>
                                    <Grid mt={11}>
                                        <Grid.Col span={6}>
                                            <Center>
                                                <Text fw={700}>Height</Text>
                                            </Center>
                                            <Center>
                                                <Text c="black">{data?.height} cm</Text>
                                            </Center>
                                        </Grid.Col>
                                        <Grid.Col span={6}>
                                            <Center>
                                                <Text fw={700}>Weight</Text>
                                            </Center>
                                            <Center>
                                                <Text c="black">{data?.weigth} Kg</Text>
                                            </Center>
                                        </Grid.Col>
                                    </Grid>
                                </div>
                                <Divider mt={25} />

                                {/* Stats */}
                                <div className={classes.statsContainer}>
                                    <Center mt={15}>
                                        <Text fw={700}>Base Stats</Text>
                                    </Center>
                                    <Grid mt={11} mb={11}>
                                        {stats}
                                    </Grid>
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>

                        {/* Moves */}
                        <Accordion.Item value="Moves">
                            <Accordion.Control>
                                <AccordionPlainDetails label="Move Set" description="A technique that a Pokémon uses during Battles. Moves are mainly used to inflict damage on the opponent." />
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Container>
                                    <ScrollArea style={{ height: 250 }} offsetScrollbars>
                                        <Grid grow gutter="xs">
                                            {moves}
                                        </Grid>
                                    </ScrollArea>
                                </Container>
                            </Accordion.Panel>
                        </Accordion.Item>

                        {/* Evolution */}
                        <Accordion.Item value="Evolution">
                            <Accordion.Control>
                                <AccordionPlainDetails label="Evolution" description="Most Pokémon evolve when they reach or surpass a certain level. Once such a Pokémon has reached the required level." />
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Text>Test</Text>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </Grid.Col>
            </Grid>
        </>
    )
}

/**
 * @remarks
 * This page is needed to add layout to the page
 *
 * @param page - the page itself
 * @returns the page with appLayout
 */
Page.getLayout = function getLayout(page: ReactElement) {
    return <AppLayout>{page}</AppLayout>;
};

export default Page;