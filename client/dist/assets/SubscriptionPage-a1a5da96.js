import{w as f,b as x,v as g,x as j,y,j as e,G as r,T as o}from"./index-f613b954.js";import{P as b,G as C,a as v}from"./api-9ad2fa78.js";import{b as w,C as S,N as k}from"./Navbar-657ff42c.js";import{B as a}from"./Button-3cdfd07c.js";import{S as P}from"./Sidebar-f486db0c.js";import"./Favorite-78b9b9c5.js";import"./ListItem-e6a19788.js";import"./ListItemText-998a98a9.js";const D=()=>{var u;let s=new URLSearchParams(window.location.search);const t=f(n=>n.user.user),[h,l]=x.useState(!1),m=g(),p=j();console.log(t),x.useEffect(()=>{if(!h&&t&&(l(!0),s.get("pack"))){const n=s.get("pack");b({pack:n}).then(i=>{m(y(i.data)),p("/HoneyVip")}).catch(()=>{l(!1)})}},[t]);const c=async()=>{try{const n={email:t.email};C(n).then(i=>{window.location.href=i.data.url}).catch(i=>{console.error("Error occurred during API call:",i)})}catch(n){console.log(n)}},d=async()=>{try{const n={email:t.email};v(n).then(i=>{window.location.href=i.data.url}).catch(i=>{console.error("Error occurred during API call:",i)})}catch(n){console.log(n)}};return e.jsx(r,{item:!0,xs:11.9,lg:11,container:!0,sx:{mb:10,position:"relative"},children:e.jsx(w,{className:"CardItems",variant:"outlined",sx:{width:"100%",minHeight:"70vh",borderRadius:6,backdropFilter:"brightness(0.9) blur(15px)",backgroundColor:"rgba(255, 255, 255, 0.7)"},children:e.jsx(S,{children:e.jsxs(r,{container:!0,children:[e.jsx(r,{item:!0,xs:12,sx:{mt:1,display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center"},children:e.jsx(o,{variant:"h3",noWrap:!0,component:"a",href:"/",sx:{mr:2,display:{xs:"flex",md:"flex"},fontFamily:"Montez",fontWeight:700,letterSpacing:".3rem",color:"inherit",textDecoration:"none"},children:"HoneyBee"})}),e.jsx(r,{item:!0,xs:12,sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center"},children:e.jsx(o,{variant:"h3",noWrap:!0,component:"a",href:"/",sx:{mt:1,mr:1,fontFamily:"Montez",fontWeight:700,letterSpacing:".3rem",color:"inherit",textDecoration:"none"},children:"VIP"})}),e.jsx(r,{item:!0,xs:12,sx:{mt:5,display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center"},children:e.jsx(o,{variant:"h6",noWrap:!0,sx:{color:"goldenrod",mb:2},children:e.jsx("b",{children:"GOLD TIER SUBSCRIPTION"})})}),e.jsx(r,{item:!0,xs:12,sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center"},children:e.jsx(o,{variant:"subtitle2",component:"ul",sx:{color:"goldenrod"},children:e.jsx("li",{children:"Video Call - Gold tier subscribers can initiate video calls with Matched users."})})}),e.jsx(r,{item:!0,xs:12,sx:{my:2,display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center"},children:(u=t==null?void 0:t.HoneyVipType)!=null&&u.includes("gold")||t!=null&&t.HoneyVipType.includes("platinum")?e.jsx(a,{variant:"contained",color:"success",large:!0,fullWidth:!0,disabled:!0,onClick:c,children:"You have Gold Access"}):e.jsx(a,{variant:"outlined",color:"inherit",large:!0,fullWidth:!0,onClick:c,sx:{backgroundColor:"goldenrod",color:"black","&:hover":{backgroundColor:"black",color:"goldenrod"}},children:"Access Gold Now for just RS:500"})}),e.jsx(r,{item:!0,xs:12,sx:{mt:4,display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center"},children:e.jsx(o,{variant:"h6",noWrap:!0,sx:{color:"grey",mb:2},children:e.jsx("b",{children:"PLATINUM TIER SUBSCRIPTION"})})}),e.jsx(r,{item:!0,xs:12,sx:{display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center"},children:e.jsxs(o,{variant:"subtitle2",component:"ul",sx:{color:"grey"},children:[e.jsx("li",{children:"Video Call - Gold tier subscribers can initiate video calls with Matched users."}),e.jsx("li",{children:"Advanced Search Functionality Platinum tier subscribers can enjoy advanced search capabilities. They can search for other users based on criteria such as name, age, interests, location, and any other relevant information. This feature enables them to find potential matches more specifically."})]})}),e.jsx(r,{item:!0,xs:12,sx:{my:2,display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"center"},children:t!=null&&t.HoneyVipType.includes("platinum")?e.jsx(a,{variant:"contained",color:"inherit",large:!0,fullWidth:!0,disabled:!0,onClick:d,children:"You have Platinum Access"}):e.jsx(a,{variant:"outlined",color:"inherit",large:!0,fullWidth:!0,onClick:d,sx:{backgroundColor:"grey",color:"black","&:hover":{backgroundColor:"black",color:"white"}},children:"Access Platinum Now for just RS:1500"})})]})})})})};function V(){return e.jsx("div",{children:e.jsxs(r,{container:!0,spacing:12,children:[e.jsx(r,{item:!0,xs:12,children:e.jsx(k,{})}),e.jsx(r,{item:!0,xs:!0,sx:{display:{xs:"none",md:"block",lg:"block"}},children:e.jsx(P,{})}),e.jsx(r,{item:!0,xs:12,sm:12,md:8,lg:8,children:e.jsx(D,{})})]})})}export{V as default};
