import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/post'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Post = () => (
  <Layout title="Hack The Box Writeup">
    <Container>
      <Title>
        Hack The Box Writeup <Badge>2022</Badge>
      </Title>
      <P>
      Lorem Ipsum. 
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://www.hackthebox.com">
            https://www.hackthebox.com <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Hack The Box</span>
        </ListItem>
        <ListItem>
          <Meta>Skills</Meta>
          <span>Bash, Priviledge Escalation, Reverse Shells</span>
        </ListItem>
        <ListItem>
          <Meta>Difficulty</Meta>
          <span> 5/10 </span>
        </ListItem>
      </List>

      <WorkImage src="/images/posts/hacktheboxlogo.png" alt="htblogo" />
      
    </Container>
  </Layout>
)

export default Post
