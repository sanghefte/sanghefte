import React from "react";
import '../Song.css';

type SongProps = {
    lyrics: string;
};

export function Song({ lyrics }: SongProps) {
    return (
        <div className="song">
            {lyrics}
        </div>
    );
}