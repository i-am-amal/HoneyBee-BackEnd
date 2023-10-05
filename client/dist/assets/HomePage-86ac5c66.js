import{p as w,q as U,j as e,b as a,G as s,t as p,T as v,v as A,w as E,y as S}from"./index-f613b954.js";import{b as _,C as H,N as T}from"./Navbar-657ff42c.js";import{S as L}from"./Sidebar-f486db0c.js";import{d as B,B as V}from"./BoilerPlateCode-bb9f5851.js";import{L as $}from"./Loader-8a104b4e.js";import{K as q}from"./KeepMountedModal-7cf8e028.js";import{S as b}from"./Skeleton-e1792671.js";import{B as y}from"./Button-3cdfd07c.js";import{D as N,l as O,d as G}from"./api-9ad2fa78.js";import"./Favorite-78b9b9c5.js";import"./ListItem-e6a19788.js";import"./ListItemText-998a98a9.js";/* empty css               */import"./Chip-2def64cc.js";import"./useSlot-c8cc3803.js";import"./useButton-dd23b069.js";import"./ModalDialog-c169445d.js";import"./Sheet-f21bf35e.js";import"./styleUtils-cf904da4.js";var k={},K=U;Object.defineProperty(k,"__esModule",{value:!0});var R=k.default=void 0,W=K(w()),J=e,Q=(0,W.default)((0,J.jsx)("path",{d:"M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"}),"ThumbUp");R=k.default=Q;var C={},X=U;Object.defineProperty(C,"__esModule",{value:!0});var D=C.default=void 0,Y=X(w()),Z=e,ee=(0,Y.default)((0,Z.jsx)("path",{d:"M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4zM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34C17 5.05 15.95 4 14.66 4h-8.1c-.71 0-1.36.37-1.72.97l-2.67 6.15z"}),"ThumbDownAlt");D=C.default=ee;function te({user:m,isLoading:i,filteredUsers:c,likeHandler:h,dislikeHandler:f}){const[j,u]=a.useState(!1),[g,d]=a.useState(""),n=t=>{d(t),u(!0)};return e.jsx(e.Fragment,{children:i?e.jsx(s,{item:!0,xs:12,sx:{my:2,position:"absolute",width:"100%"},children:e.jsx($,{user:m})}):c.length>0?c.map(t=>e.jsxs(s,{item:!0,xs:12,sx:{my:2,position:"absolute",width:"100%"},children:[e.jsxs(_,{className:"CardItems",variant:"outlined",sx:{mb:4,minHeight:"70vh",borderRadius:6},children:[e.jsxs(p,{sx:{width:"100%",height:"40vh",position:"relative"},children:[e.jsx(p,{sx:{objectFit:"cover",width:"100%",height:"100%"},component:"img",loading:"lazy",src:t!=null&&t.coverPic?t==null?void 0:t.coverPic:"/cover-picture.png"}),e.jsx(p,{sx:{objectFit:"cover",width:150,height:150,borderRadius:"5rem",position:"absolute",top:"100%",left:{xs:"10%",sm:"33%",lg:"0%"},transform:"translate(50%, -50%)"},loading:"lazy",component:"img",src:t!=null&&t.profilePic?t==null?void 0:t.profilePic:"/avatar.jpg"})]}),e.jsx(H,{children:e.jsxs(s,{container:!0,sx:{width:"100%"},children:[e.jsx(s,{item:!0,xs:2.6}),e.jsxs(s,{item:!0,xs:7,lg:8,sx:{mt:{xs:10,lg:0}},children:[e.jsxs(v,{sx:{textAlign:{xs:"center",lg:""},fontFamily:"sans-serif",fontSize:{lg:"2rem"},fontWeight:"bold"},children:[i?e.jsx(b,{width:"15rem"}):t.fullName," ",i?e.jsx(b,{width:"5rem"}):e.jsx(v,{variant:"caption",children:t.age})]}),e.jsx(v,{sx:{textAlign:{xs:"center",lg:""},fontSize:{xs:7,lg:14}},variant:"subtitle2",children:i?e.jsx(b,{width:"13rem"}):e.jsxs(p,{sx:{display:"flex",justifyContent:"center",alignItems:"end"},children:[e.jsx(B,{}),"Lives in ",t.location]})})]}),e.jsx(s,{item:!0,xs:1}),e.jsxs(s,{sx:{mt:10},item:!0,xs:12,children:[e.jsxs(s,{sx:{display:"flex",alignContent:"center",alignItems:"center",justifyContent:"space-around"},children:[e.jsx(y,{startIcon:e.jsx(D,{}),color:"inherit",variant:"outlined",sx:{borderRadius:"1rem",px:{xs:1,lg:13}},size:`medium\r
                            \r
                            `,onClick:()=>f(t._id),children:"DisLike"}),e.jsx(y,{startIcon:e.jsx(R,{}),color:"error",variant:"outlined",sx:{borderRadius:"1rem",px:{xs:1,lg:13}},size:"medium",onClick:()=>h(t._id),children:"Like"})]}),e.jsx(s,{item:!0,sx:{mt:3},xs:12,children:e.jsx(s,{sx:{display:"flex",alignContent:"center",alignItems:"center",justifyContent:"space-around"},children:e.jsx(y,{color:"primary",variant:"outlined",sx:{borderRadius:"1rem",px:{xs:1,lg:13}},size:"medium",onClick:()=>n(t),children:"Vist Profile"})})})]})]})})]}),e.jsx(q,{user:g,setUser:d,open:j,setOpen:u,isLoading:i})]},t._id)):e.jsx(s,{item:!0,xs:11.9,lg:11,container:!0,sx:{mb:10,position:"relative"},children:e.jsx(_,{className:"CardItems",variant:"outlined",sx:{width:"100%",minHeight:"70vh",borderRadius:6,backdropFilter:"brightness(0.9) blur(15px)",backgroundColor:"rgba(255, 255, 255, 0.7)"},children:e.jsx(s,{container:!0,sx:{display:"flex",justifyContent:"center",alignContent:"center",height:"100%"},children:e.jsx(s,{sx:{},children:e.jsx("lottie-player",{src:"https://lottie.host/fd72ffec-6def-4055-bd06-6cbd9333bb25/ajpBAR9H9V.json",background:"transparent",speed:"1",style:{width:"20rem",height:"20rem"},loop:!0,autoplay:!0})})})})})})}function se(){const m=A(),i=E(r=>r.user.user),[c,h]=a.useState([]),[f,j]=a.useState(!0),[u,g]=a.useState([]),[d,n]=a.useState({}),t={open:!1,success:!1,data:""};a.useEffect(()=>{n(t)},[]),a.useEffect(()=>{i&&setTimeout(()=>{j(!1)},4e3)},[i]),a.useEffect(()=>{N().then(r=>{h(r.data)}).catch(r=>{window.location.reload()})},[]),a.useEffect(()=>{var r,x;if(c){const l=(r=i==null?void 0:i.likedUsers)==null?void 0:r.map(o=>o.toString()),M=(x=i==null?void 0:i.dislikedUsers)==null?void 0:x.map(o=>o.toString()),P=c==null?void 0:c.filter(o=>!l.includes(o==null?void 0:o._id.toString())&&!M.includes(o==null?void 0:o._id.toString()));g(P)}},[c,i]);const I=async r=>{const x={User:r};try{n(t);const l=await O(x);n({data:"Liked user successfully",success:!0,open:!0}),m(S(l.data))}catch(l){n({data:"Falied to like user ",success:!1,open:!0}),console.log(l)}},z=async r=>{const x={User:r};try{n(t);const l=await G(x);n({data:"Disliked user successfully",success:!0,open:!0}),m(S(l.data))}catch(l){n({data:"Falied to dislike user ",success:!1,open:!0}),console.log(l)}};a.useEffect(()=>{console.log(d)},[d]);const F=()=>{n(t)};return e.jsx(e.Fragment,{children:e.jsx(s,{container:!0,children:e.jsxs(s,{item:!0,xs:12,lg:11,container:!0,sx:{position:"relative",minHeight:{xs:"90vh",lg:"9"}},children:[e.jsx(te,{user:i,isLoading:f,filteredUsers:u,likeHandler:I,dislikeHandler:z}),e.jsx(V,{success:d.success,open:d.open,data:d.data,setToastClosed:F})]})})})}function ke(){return e.jsxs(s,{container:!0,spacing:12,children:[e.jsx(s,{item:!0,xs:12,children:e.jsx(T,{})}),e.jsx(s,{item:!0,xs:!0,sx:{display:{xs:"none",md:"block",lg:"block"}},children:e.jsx(L,{})}),e.jsx(s,{item:!0,xs:12,sm:12,md:8,lg:8,children:e.jsx(se,{})})]})}export{ke as default};