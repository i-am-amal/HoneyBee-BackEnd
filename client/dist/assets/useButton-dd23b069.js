import{b as n,n as L,e as C,_ as k}from"./index-f613b954.js";import{e as S}from"./useSlot-c8cc3803.js";function H(m={}){const{disabled:l=!1,focusableWhenDisabled:p,href:D,rootRef:F,tabIndex:c,to:R,type:g}=m,i=n.useRef(),[T,f]=n.useState(!1),{isFocusVisibleRef:d,onFocus:B,onBlur:E,ref:M}=L(),[s,b]=n.useState(!1);l&&!p&&s&&b(!1),n.useEffect(()=>{d.current=s},[s,d]);const[r,x]=n.useState(""),N=t=>e=>{var o;s&&e.preventDefault(),(o=t.onMouseLeave)==null||o.call(t,e)},V=t=>e=>{var o;E(e),d.current===!1&&b(!1),(o=t.onBlur)==null||o.call(t,e)},K=t=>e=>{var o;if(i.current||(i.current=e.currentTarget),B(e),d.current===!0){var a;b(!0),(a=t.onFocusVisible)==null||a.call(t,e)}(o=t.onFocus)==null||o.call(t,e)},y=()=>{const t=i.current;return r==="BUTTON"||r==="INPUT"&&["button","submit","reset"].includes(t==null?void 0:t.type)||r==="A"&&(t==null?void 0:t.href)},U=t=>e=>{if(!l){var o;(o=t.onClick)==null||o.call(t,e)}},w=t=>e=>{var o;l||(f(!0),document.addEventListener("mouseup",()=>{f(!1)},{once:!0})),(o=t.onMouseDown)==null||o.call(t,e)},P=t=>e=>{var o;if((o=t.onKeyDown)==null||o.call(t,e),!e.defaultMuiPrevented&&(e.target===e.currentTarget&&!y()&&e.key===" "&&e.preventDefault(),e.target===e.currentTarget&&e.key===" "&&!l&&f(!0),e.target===e.currentTarget&&!y()&&e.key==="Enter"&&!l)){var a;(a=t.onClick)==null||a.call(t,e),e.preventDefault()}},I=t=>e=>{var o;if(e.target===e.currentTarget&&f(!1),(o=t.onKeyUp)==null||o.call(t,e),e.target===e.currentTarget&&!y()&&!l&&e.key===" "&&!e.defaultMuiPrevented){var a;(a=t.onClick)==null||a.call(t,e)}},_=n.useCallback(t=>{var e;x((e=t==null?void 0:t.tagName)!=null?e:"")},[]),v=C(_,F,M,i),u={};return r==="BUTTON"?(u.type=g??"button",p?u["aria-disabled"]=l:u.disabled=l):r!==""&&(!D&&!R&&(u.role="button",u.tabIndex=c??0),l&&(u["aria-disabled"]=l,u.tabIndex=p?c??0:-1)),{getRootProps:(t={})=>{const e=S(m),o=k({},e,t);return delete o.onFocusVisible,k({type:g},o,u,{onBlur:V(o),onClick:U(o),onFocus:K(o),onKeyDown:P(o),onKeyUp:I(o),onMouseDown:w(o),onMouseLeave:N(o),ref:v})},focusVisible:s,setFocusVisible:b,active:T,rootRef:v}}export{H as u};
