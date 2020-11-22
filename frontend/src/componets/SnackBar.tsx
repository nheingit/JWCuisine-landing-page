import React from 'react';
import {useSnackbar} from 'notistack';

const SnackBar = (prop: string) => {
    const { enqueueSnackbar } = useSnackbar();

    const ErrorBar = () => {
        enqueueSnackbar(prop,
             {
                 variant: "error",
                 anchorOrigin: { vertical: "bottom", horizontal: "center" },
             }

         );
            };
return ErrorBar
         
}
export default SnackBar;