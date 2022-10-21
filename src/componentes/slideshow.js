import imageA from '../images/a.jpg';
import imageB from '../images/b.jpg';
import imageC from '../images/c.jpg';
import imageD from '../images/d.jpg';
import {ReactComponent as Izquierda} from '../images/left.svg';
import {ReactComponent as Derecha} from '../images/right.svg';
import styled from 'styled-components';
import {useRef, useEffect} from 'react';
const Slideshow=()=>{
    const siguiente=()=>{
        //que el slideshow tenga hijos
        if(slideshow.current.children.length>0){
            //obtenemos el primer elemento del slideshow
            const primerElemento=slideshow.current.children[0];
            slideshow.current.style.transition=`600ms ease-out all`;
            const slideSize=slideshow.current.children[0].offsetWidth;
            slideshow.current.style.transform=`translateX(-${slideSize}px)`;
            const transicion=()=>{
                slideshow.current.style.transition='none';
                slideshow.current.style.transform='translateX(0px)';
                slideshow.current.appendChild(primerElemento);
                slideshow.current.removeEventListener('transitionend',transicion)
            }
            slideshow.current.addEventListener('transitionend', transicion);
        }
    };
    useEffect(()=>{
        const intervalo=setInterval(()=>{
            siguiente();
        },5000);
        slideshow.current.addEventListener('mouseenter',()=>{
            clearInterval(intervalo);
            console.log('hhodffg')
        })
    },[])
    const anterior=()=>{
        if(slideshow.current.children.length>0){
            const index=slideshow.current.children.length-1;
            const ultimoElemento=slideshow.current.children[index];
            slideshow.current.insertBefore(ultimoElemento,slideshow.current.firstChild);
            slideshow.current.style.transition='none';
            const slideSize=slideshow.current.children[0].offsetWidth;
            slideshow.current.style.transform=`translateX(-${slideSize}px)`;
            setTimeout(()=>{
                slideshow.current.style.transition=`600ms ease-out all`;
                slideshow.current.style.transform='translateX(0)';
            },30)
        }
    }
    const slideshow=useRef(null);
    return (
        <ContenedorPrincipal>
            <ContenedorSlideshow ref={slideshow}>
                <Slide>
                    <a href='www.github.com'>
                        <img src={imageA}/>
                    </a>
                    <TextoSlide>15% de descuentos en productos Apple</TextoSlide>
                </Slide>
                <Slide>
                    <a href='www.github.com'>
                        <img src={imageB}/>
                    </a>
                    <TextoSlide>15% de descuentos en productos Apple</TextoSlide>
                </Slide>
                <Slide>
                    <a href='www.github.com'>
                        <img src={imageC}/>
                    </a>
                    <TextoSlide>15% de descuentos en productos Apple</TextoSlide>
                </Slide>
                <Slide>
                    <a href='www.github.com'>
                        <img src={imageD}/>
                    </a>
                    <TextoSlide>15% de descuentos en productos Apple</TextoSlide>
                </Slide>
            </ContenedorSlideshow>
            <Controles>
                <Boton onClick={anterior}>
                    <Izquierda/>
                </Boton>
                <Boton derecho onClick={siguiente}>
                    <Derecha/>
                </Boton>
            </Controles>
        </ContenedorPrincipal>
    )
}
const ContenedorPrincipal=styled.div`
    position: relative;
`;
const ContenedorSlideshow=styled.div`
    display: flex;
    flex-wrap: nowrap;
`;
const Slide= styled.div`
    min-width: 100%;   
    overflow:hidden;
    transition: .5s ease all;
    z-index:10;
    max-height:500px;
    position:relative;
    img{
        width:100%;
        vertical-align:top;
    }
`;
const TextoSlide=styled.div`
    background-color: ${props=>props.colorFondo?props.colorFondo: 'rgba(0,0,0,.3)'};
    color: ${props=>props.colorTexto?props.colorTexto:'#fff'};
    width:100%;
    text-align: center;
    padding: 10px 60px;
    position: absolute;
    bottom: 0;
    @media screen and (max-width:700px){
        position:relative;
        background-color:black;
    }
`;
const Controles= styled.div`
    position: absolute;
    top:0;
    z-index:20;
    width:100%;
    height:100%;
    pointer-event:none;
`;
const Boton=styled.button`
    pointer-event:all;
    outline:none;
    cursor: pointer;
    border: none;
    background:none;
    width: 50px;
    height: 50%;
    position: absolute;
    bottom:30%;
    border-radius:10px;
    text-align: center;
    transition: 0.4s ease all;
    &:hover{
        background: rgba(0,0,0,.4);
        path{
            fill:#fff
        }
    }
    path{
        filter:${props=>props.derecho? 'drop-shadow(-2px 0 0 #fff)': 'drop-shadow(2px 0 0 #fff)'}
    }
    ${props=> props.derecho ? 'right:0' : 'left: 0' }
`;
export default Slideshow;