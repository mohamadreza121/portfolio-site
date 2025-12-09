import React from 'react';

export default function PillButton({children, onClick, to, className='', ...props}){
  const Base = ({children, ...rest}) => (
    <button className={`btn-pill ${className}`} {...rest}>{children}</button>
  );

  // if `to` provided, render anchor-like button
  if(to){
    return (
      <a className={`btn-pill ${className}`} href={to} {...props}>
        {children}
      </a>
    )
  }

  return <Base onClick={onClick}>{children}</Base>;
}
