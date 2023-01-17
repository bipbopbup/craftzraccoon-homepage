import { Container, Badge, Link, List, ListItem, Code } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/post'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Post = () => (
  <Layout title="Faculty Writeup">
    <Container>
      <Title>
        Faculty Machine Writeup <Badge>2022</Badge>
      </Title>
      <P>
      This medium-rated Linux machine includes SQL injection, steganography, meta-git exploit and more!
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://app.hackthebox.com/machines/Faculty">
            https://www.hackthebox.com/machines/Faculty <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Hack The Box</span>
        </ListItem>
        <ListItem>
          <Meta>Skills</Meta>
          <span> SQL injection, mpdf, steganography, meta-git</span>
        </ListItem>
        <ListItem>
          <span> 4/10 </span>
        </ListItem>
          <Meta>Difficulty</Meta>
      </List>
    <P>As always, we first ping our target to see if its reachable. ttl=63 confirms us that we are probably looking to a Linux based system. Then we will scan our ports with:</P>
    <Code>nmap sCV 10.10.11.169 -o output</Code>
    <P>This quick nmap reveals that our target has 2 open ports, those being 22 and 80. Let&apos;s also perform a gobuster scan for directories:</P>
    <Code>gobuster dir -u faculty.htb -w /usr/share/dirb/wordlists/common.txt -t 30</Code>
    <P>We will find an admin directory</P>
    <WorkImage src="/images/posts/Faculty/2.png" alt="recon"/>
    <WorkImage src="/images/posts/Faculty/1.png" alt="web"/>
    <P>Now we navigate to the admin directory and perform a simple SQL injection as follows:</P>
    <Code>admin' or 1=1-- -</Code>
    <P>Once inside, we will find in Users an &quot;admin&quot; username and a bunch of emails and names in &quot;Faculty List&quot;. I tried to SQL injection this page through PHPSESSID cookie but it did&apos;t work.</P>
    <WorkImage src="/images/posts/Faculty/3.png" alt="sql_injection_cookie"/>
    <P>Now we need to re-evaluate our options. Let&apos;s download that pdf from admin page and check what is mpdf exactly.</P>
    <P>We intercept the pdf request and decode it with base 64 and then it&apos;s special characters which are url encoded twice. We will find some usernames: gbyolo, root and developer</P>
    <P>mpdf is a php library used to generate pdfs from UTF-8 encoded html. It seems like it has a vulnerability which published here:</P>
    <Link href="https://github.com/mpdf/mpdf/issues/356">https://github.com/mpdf/mpdf/issues/356 <ExternalLinkIcon mx="2px"/></Link>
    <P>After encoding the special characters with URL encoding twice and then base 64, we succesfully download /etc/passwd file:</P>
    <WorkImage src="/images/posts/Faculty/7.png" alt="mpdf_exploit"/>
    <P>We can actually use this script to hunt for other files like db_connect.php, which contains the hardcoded password for gbyolo.</P>
    
    <P>This tutorial shows how to use mpdf to upload an image injected with malicious code to generate a shell and then use it.</P>
    <Link href="https://www.youtube.com/watch?v=tbjtfGvym4M">https://www.youtube.com/watch?v=tbjtfGvym4M <ExternalLinkIcon mx="2px"/></Link>
    <Link href="https://github.com/ambionics/phpggc">https://github.com/ambionics/phpggc <ExternalLinkIcon mx="2px"/></Link>

    
   

    </Container>
  </Layout>
)

export default Post
