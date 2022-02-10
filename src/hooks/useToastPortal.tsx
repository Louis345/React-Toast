import { useState, useEffect, } from 'react';
import { uuid } from '../shared/helpers';



export const useToastPortal = (position:'topRight' | 'topLeft' | 'center'): {loaded:boolean, portalId:string} => {
    const [loaded, setLoaded] = useState(false);
    const [portalId] = useState(`toast-portal-${uuid()}`);

    const getPosition = () => {
     
        switch (position) {
            case 'topRight':
                return 'top: 10px; right: 0;';
            case 'topLeft':
                return 'top: 10px; left: 0;';
            case 'center':
                return 'top: 10px; left: 0; transform: translate(calc(50vw - 50%));';
        }
    }

    useEffect(() => {
        let div = document.createElement('div');
        div.id = portalId;
       
        div.setAttribute('style',`position: fixed; top:10px; ${getPosition()}; z-index:999;`);
        document.getElementsByTagName('body')[0].prepend(div);
        setLoaded(true);
        return () =>document.getElementsByTagName(portalId)[0] &&  document.getElementsByTagName(portalId)[0].prepend(div);

    }, [portalId, position]);
   
    return { loaded, portalId };
}

