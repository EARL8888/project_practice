<!--
    Author: earl
    Description: 挖矿收益计算器
-->
<template>
    <div>
        <div id="wrapper">
            <div id="middle-row">
                <div id="calculator-inputs" class="section">
                    <div class="heading">
                        <label>计算参数</label>
                        <span style="font-size:12px; float:right; margin-right:20px;color:#7d7d7d; text-align:right;">
                            比特币价格：
                            <font color="red" class="btcjg">48201.74 ￥/BTC</font>
                            全网算力：
                            <font color="red" class="qwsl">24785(PH/S)</font>
                            单位挖矿产出：
                            <font color="red" class="dwwkcc">0.00007฿/1T/天(￥3.50)</font>
                            <br>(注*计算结果是理论收益 未考虑其他损耗)
                        </span>
                    </div>
                    <table id="input-table">
                        <tbody>
                        <tr>
                            <td align="left"><h3>矿机参数</h3><span
                                style="font-size:10px; color:#c1c1c1; margin-left:20px;">注: 1000M=1G，1000G=1T，1000T=1P</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>算力 (GH/s)</td>
                                        <td>
                                            <input type="text" name="rate" id="rate" class="text-input"
                                                   value="1000">
                                            <label id="hash-error" class="error-label right"></label>
                                        </td>
                                        <td>&nbsp;&nbsp;&nbsp;功耗 (W)</td>
                                        <td>
                                            <input type="text" name="power" id="power" class="text-input"
                                                   value="0">
                                            <label id="power-error" class="error-label right"></label>
                                        </td>
                                        <td>
                                            <nav class="dropdown-style">&nbsp;&nbsp;&nbsp;矿机成本(￥)</nav>
                                        </td>
                                        <td>
                                            <input type="text" name="cost" id="cost" class="text-input" value="0">
                                            <label id="cost-error" class="error-label right"></label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="left"><h3>其他成本</h3></td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>运输费用</td>
                                        <td>
                                            <input type="text" name="shipping" id="shipping" value="0"
                                                   class="text-input ">
                                            <label id="shipping-error" class="error-label right"></label>
                                        </td>
                                        <td>&nbsp;&nbsp;&nbsp;其他费用 (电缆等)</td>
                                        <td>
                                            <input type="text" name="misc" id="misc" value="0" class="text-input ">
                                            <label id="misc-error" class="error-label right"></label>
                                        </td>
                                        <td>&nbsp;&nbsp;&nbsp;矿池手续费 (%)</td>
                                        <td>
                                            <input type="text" name="pool" id="pool" class="text-input " value="0">
                                            <label id="pool-error" class="error-label right"></label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="left"><h3>网络情况</h3></td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>当前难度(百万)</td>
                                        <td><input type="text" name="difficulty" id="difficulty" class="text-input "
                                                   value="">
                                            <label id="difficulty-error" class="error-label right"></label>
                                        </td>
                                        <td>&nbsp;&nbsp;&nbsp;每月难度增加 &nbsp; 幅度(%)</td>
                                        <td><input type="text" name="increase" id="increase" class="text-input "
                                                   value="0">
                                            <label id="increase-error" class="error-label right"></label>
                                        </td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="left"><h3>时间</h3></td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>开始时间</td>
                                        <td><input type="text" name="stime" id="stime" class="text-input "
                                                   onclick="" style="width:100px;" value=""><label
                                            id="stime-error" class="error-label right"></label></td>
                                        <td>&nbsp;&nbsp;&nbsp;结束时间</td>
                                        <td><input type="text" name="etime" id="etime" class="text-input "
                                                   onclick="" style="width:100px;" value=""><label
                                            id="etime-error" class="error-label right"></label></td>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="left"><h3>价格&amp;电费</h3></td>
                        </tr>
                        <tr>
                            <td>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>价格 (￥/BTC)</td>
                                        <td><input type="text" name="conversion" id="conversion" class="text-input "
                                                   value="0"><label id="conversion-error"
                                                                    class="error-label right"></label>
                                        </td>
                                        <td>&nbsp;&nbsp;&nbsp;每月价格上涨幅度 (%)</td>
                                        <td><input type="text" name="conversion" id="conversion-increase"
                                                   class="text-input " value="0"><label id="conversion-error"
                                                                                        class="error-label right"></label>
                                        </td>
                                        <td>&nbsp;&nbsp;&nbsp;电费 (￥/kWh)</td>
                                        <td><input type="text" name="electricity" id="electricity" class="text-input "
                                                   value="0.6"><label id="electricity-error"
                                                                      class="error-label right"></label>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="left"><label id="input-error" class="error-label"><br></label></td>
                        </tr>
                        <tr>
                            <td><input type="submit" name="submit" class="button" id="submit_button" value="计算"></td>
                            <td><span
                                style="color: rgb(255, 0, 0); font-size: 0.6em;margin-left: 8px;">请点击"计算"获取结果</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
    #wrapper {
        width: 1000px;
        margin: 0 auto;
        text-align: left;
        color: #fff;
    }

    #middle-row {
        width: 1000px;
    }

    #calculator-inputs {
        font-size: 12px;
    }

    .section {
        margin-top: 10px;
    }

    .section {
        margin: 5px;
    }

    .section {
        padding: 10px;
        border: 2px solid #555;
        border-radius: 5px;
    }

    .section .heading {
        font-size: 20px;
        margin-bottom: 10px;
    }

    table {
        border-collapse: collapse;
    }

    #submit_button {
        float: right;
    }

    .button {
        background: #ff8400;
        border: 0 none;
        border-radius: 5px;
        padding: 3px 5px;
        color: #1e1e1e;
        font-size: 12px;
    }

    .dropdown-style {
        display: inline-block;
        border-radius: 5px;
    }

    tbody{
        line-height: 24px;
    }

</style>
