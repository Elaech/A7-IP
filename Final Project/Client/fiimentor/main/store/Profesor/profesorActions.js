import {Action} from 'redux';
import {Profesor} from '../../core/domain/Profesor';

export const ProfesorActions = {
    GET_PROFESORI: 'GET_PROFESORI',
    GET_PROFESORI_SUCCESS: 'GET_PROFESORI_SUCCESS',
    GET_PROFESORI_ERROR: 'GET_PROFESORI_ERROR',

};

export interface GetProfesoriAction extends Action {
    type: ProfesorActions.GET_PROFESORI;
};

export interface GetProfesoriSuccessAction extends Action {
    type:  ProfesorActions.GET_PROFESORI_SUCCESS;
    payload: Profesor[];
};

export interface GetProfesoriErrorAction extends Action {
    type: ProfesorActions.GET_PROFESORI_ERROR;
    payload: Error;
}

export const getProfesoriAction = (): GetProfesoriAction => ({
    type: ProfesorActions.GET_PROFESORI,
});

export const getProfesoriSuccessAction = (payload: Profesor[]): GetProfesoriSuccessAction => ({
    type: ProfesorActions.GET_PROFESORI_SUCCESS,
    payload,
});

export const getProfesoriErrorAction = (payload?: Error): GetProfesoriErrorAction => ({
    type: ProfesorActions.GET_PROFESORI_ERROR,
    payload,
});


