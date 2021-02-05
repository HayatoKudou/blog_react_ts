import * as React from 'react';

export var Table: React.FC = () => {
    return(
        <table className="program_readyState_table">
            <tbody>
                <tr className="program_readyState_table_center">
                    <td>値</td>
                    <td>状態</td>
                    <td>説明</td>
                </tr>
                <tr>
                    <td className="program_readyState_table_center">0</td>
                    <td className="program_readyState_table_center">UNSENT</td>
                    <td>クライアントは作成済み。open() はまだ呼ばれていない。</td>
                </tr>
                <tr>
                    <td className="program_readyState_table_center">1</td>
                    <td className="program_readyState_table_center">OPENED</td>
                    <td>open() が呼び出し済み。</td>
                </tr>
                <tr>
                    <td className="program_readyState_table_center">2</td>
                    <td className="program_readyState_table_center">HEADERS_RECEIVED</td>
                    <td>send() が呼び出し済みで、ヘッダーとステータスが利用可能。</td>
                </tr>
                <tr>
                    <td className="program_readyState_table_center">3</td>
                    <td className="program_readyState_table_center">LOADING</td>
                    <td>ダウンロード中。responseText には部分データが入っている。</td>
                </tr>
                <tr>
                    <td className="program_readyState_table_center">4</td>
                    <td className="program_readyState_table_center">DONE</td>
                    <td>操作が完了した。</td>
                </tr>
            </tbody>
        </table>
    )
}