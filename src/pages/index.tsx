//#region Imports
import { useEffect, useState } from 'react';
import Banner from '@/core/components/_banner';
import PCard from '@/core/components/_card';
import { IPCard } from '@/core/interface/PCard';
import AppLayout from '@/core/layout';
import {
	ActionIcon,
	Center,
	createStyles,
	Flex,
	Grid,
	Kbd,
	Pagination,
	Paper,
	TextInput,
	Tooltip,
	useMantineTheme,
	Text
} from '@mantine/core';
import { useKey } from 'react-use';
import { ReactElement } from 'react'
import { Search, Refresh, ArrowRight, TextPlus, StairsUp } from 'tabler-icons-react';
import { NextPageWithLayout } from './_app'
import { pokemonService } from './api/pokemonService'
import { useQueries, useQuery, useIsFetching } from 'react-query';
import { motion } from "framer-motion";
import { IApiResult, IPokemonBasic } from '@/core/interface/Pokemon';

const { fetchPokemons } = pokemonService
//#endregion

//#region Styles
const useStyles = createStyles((theme) => ({
	parent: {
		marginTop: 30
	},

	input: {
		width: '40%',

		// Media query with value from theme
		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			width: '95%',
		},

	},

	loader: {
		marginTop: '30%'
	},

	paperSpan: {
		fontWeight: 300,
		fontSize: 15
	}
}))
//#endregion

const Page: NextPageWithLayout = () => {

	//#region State Helper
	const { classes, cx } = useStyles();
	const theme = useMantineTheme();
	const isFetching = useIsFetching();

	useKey('ArrowLeft', () => alert('You click arrow left'))
	useKey('ArrowRight', () => alert('You click arrow right'))
	//#endregion

	//#region States

	// Pagination
	const [limit, setLimit] = useState<number>(18)
	const [offset, setOffset] = useState<number>(0)
	const [initialPage, setInitialPage] = useState<number>(1)
	const [totalPage, setTotalPage] = useState<number>(0)
	const [isPaginationChange, setIsPaginationChange] = useState<boolean>(false);

	// Child Component: Card
	const [isChildLoading, setIsChildLoading] = useState<boolean>(false)

	//#endregion

	//#region Queries
	const { data, refetch } = useQuery<IApiResult>("pokemons", () => fetchPokemons(limit, offset))
	//#endregion

	//#region UseEffect
	useEffect(() => {
		if (isFetching === 0)
			setTimeout(() => {
				setIsChildLoading(false)
			}, 200)
	}, [isFetching])

	useEffect(() => {
		if (isPaginationChange) {
			setIsChildLoading(true)
			refetch()
		}
	}, [offset])

	useEffect(() => {
		getTotalPages()
	}, [data])
	//#endregion

	//#region Helper Get/Handle
	const getTotalPages = () => {
		if (data?.count === null || data?.count === undefined)
			setTotalPage(1)
		else
			setTotalPage(data && data.count / limit)
	}
	//#endregion

	//#region Handle
	const handlePagination = (e: number) => {
		setIsPaginationChange(true)

		if (e === 1) {
			setOffset(0)
			setInitialPage(1)
		}
		else {
			const absolutePageNumber = e - 1;
			setOffset(18 * absolutePageNumber)
			setInitialPage(e)
		}

		window.scrollTo({top: 0, behavior: 'smooth' })
	}

	const handleRefresh = () => {
		setOffset(0)
		setInitialPage(1)
	}
	//#endregion

	return (
		<>
			<Flex
				direction={{ base: 'row-reverse', sm: 'row-reverse' }}
				gap={{ base: 'xs', sm: 'xs' }}
				justify={{ sm: 'flex-start' }}
			>
				<Tooltip label="Refresh">
					<ActionIcon size={38} radius="xl" color="teal" variant="filled" onClick={handleRefresh} disabled={initialPage === 1 ? true : false}>
						<Refresh size={18} />
					</ActionIcon>
				</Tooltip>
				<TextInput
					icon={<Search size={18} strokeWidth={1.5} />}
					radius="xl"
					size="md"
					className={classes.input}
					rightSection={
						<ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
							<ArrowRight size={18} strokeWidth={1.5} />
						</ActionIcon>
					}
					placeholder="Search pokemon.."
					rightSectionWidth={42}
				/>
			</Flex>

			<Paper shadow="sm" radius="lg" p="lg" mt={15} withBorder>
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
								<Text>Next Page</Text>
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
								<Text>Prev Page</Text>
							</Flex>
						</Center>
					</Grid.Col>
				</Grid>
			</Paper>

			<Grid columns={12} mt={15}>
				{
					data?.results.map((pokeBasic: IPokemonBasic, i) => {
						return (
							<Grid.Col xs={6} sm={6} md={4} lg={4}>
								<PCard name={pokeBasic.name} url={pokeBasic.url} loading={isChildLoading} setLoading={setIsChildLoading} key={i} />
							</Grid.Col>
						)
					})
				}
			</Grid>
			{
				isFetching ? (
					""
				) : (
					<Center mt={20}>
						<Pagination total={totalPage} initialPage={initialPage} radius="md" onChange={handlePagination} withEdges />
					</Center>
				)
			}
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