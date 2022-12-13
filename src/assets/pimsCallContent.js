const dateTime = new Date().toLocaleString('ko-kr');

export const pimsCallContent = `<table style="max-width: 80%;">
<tbody>
  <tr>
    <th colspan="1" rowspan="1">
      <span>전화받은 시각</span>
    </th>
    <td colspan="1" rowspan="1">
      <span>${dateTime}</span>
    </td>
  </tr>
  <tr>
    <th colspan="1" rowspan="1">
      <span>대학 이름</span>
    </th>
    <td colspan="1" rowspan="1">
      <span></span>
    </td>
  </tr>
  <tr>
    <th colspan="1" rowspan="1">
      <span>전화번호</span>
    </th>
    <td colspan="1" rowspan="1">
      <span></span>
    </td>
  </tr>
  <tr>
    <th colspan="1" rowspan="1">
      <span>요청내용</span>
    </th>
    <td colspan="1" rowspan="1">
      <p></p>
    </td>
  </tr>
</tbody>
</table>
<p></p>
`;
