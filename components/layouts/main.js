import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelRaccoonLoader from '../voxel-raccoon-loader'

const LazyVoxelRaccoon = dynamic(() => import('../voxel-raccoon'), {
	  ssr: false,
	  loading: () => <VoxelRaccoonLoader />
})

const Main = ({ children, router }) => {
	  return (
		      <Box as="main" pb={8}>
		        <Head>
		          <meta name="viewport" content="width=device-width, initial-scale=1" />
		          <meta name="description" content="Lucas M's homepage" />
		          <meta name="author" content="Lucas M." />
		          <meta name="author" content="craftzraccoon" />
		          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
		          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
		          <meta property="og:site_name" content="Lucas M's Homepage" />
		          <meta property="og:type" content="website" />
		          <meta property="og:image" content="/card.png" />
		          <title>Lucas Marco - Homepage</title>
		        </Head>

		        <NavBar path={router.asPath} />

		        <Container maxW="container.md" pt={14}>
		          <LazyVoxelRaccoon />

		          {children}

		          <Footer />
		        </Container>
		      </Box>
		    )
}

export default Main
