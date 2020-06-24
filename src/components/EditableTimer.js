import React, { useState, useContext } from 'react';
import TimerForm from './TimerForm';
import Timer from './Timer';
import { AppContext } from '../context/AppContext';

export default function EditableTimer(props) {

    if (props.isEditing) {
        return <TimerForm 
                    id={props.id}
                    title={props.title}
                    project={props.project}
                    elapsed={props.elapsed}
                    isRunning={props.isRunning}
                    isEditing={props.isEditing}
               />;
    }
    return (
        <Timer 
            id={props.id}
            title={props.title}
            project={props.project}
            elapsed={props.elapsed}
            isRunning={props.isRunning}
            isEditing={props.isEditing}
        />
    );
}