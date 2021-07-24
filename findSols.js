const {findByState} = require('./findByState');

let fine = 1;
// let output = '';

//*************************** 
function count(colour, position)
{
    let value = 0;
    for (let i = 0; i < 24; i++)
        if (position[i] == colour)
            value++;
    return value;
}

function isValid(position) {

    if (count('Y', position) != 4 || count('O', position) != 4 || count('B', position) != 4 || count('R', position) != 4 || count('G', position) != 4 || count('W', position) != 4)
        return false;

    let pair = [
        [position[0], position[4], position[11]], 
        [position[1], position[10], position[9]], 
        [position[2], position[6], position[5]], 
        [position[3], position[8], position[7]], 

        [position[20], position[13], position[14]], 
        [position[21], position[15], position[16]], 
        [position[22], position[17], position[18]],
        [position[23], position[19], position[12]]
    ];

    let sumy = 0;
    let sumb = 0;
    let sumr = 0;
    for (let i = 0; i < 8; i++)
    {
        if (pair[i][1] == 'W' || pair[i][1] == 'Y')
            sumy++;
        else if (pair[i][2] == 'W' || pair[i][2] == 'Y')
            sumy += 2;

        if (pair[i][1] == 'B' || pair[i][1] == 'G')
            sumb++;
        else if (pair[i][2] == 'B' || pair[i][2] == 'G')
            sumb += 2;

        if (pair[i][1] == 'R' || pair[i][1] == 'O')
            sumr++;
        else if (pair[i][2] == 'R' || pair[i][2] == 'O')
            sumr += 2;
    }

    if (sumy % 3 != 0 || sumb % 3 != 0 || sumr % 3 != 0)
        return false;

    return true;
}
//*************************** 

function R_move(prev_node, next_node)
{
    next_node = prev_node.slice();
    let temp = next_node[7];
    next_node[7] = next_node[19];
    next_node[19] = next_node[17];
    next_node[17] = next_node[1];
    next_node[1] = temp;
    temp = next_node[14];
    next_node[14] = next_node[20];
    next_node[20] = next_node[10];
    next_node[10] = next_node[3];
    next_node[3] = temp;
    temp = next_node[8];
    next_node[8] = next_node[15];
    next_node[15] = next_node[16];
    next_node[16] = next_node[9];
    next_node[9] = temp;
    return next_node;
}


function R1_move(prev_node, next_node)
{
    next_node = prev_node.slice();
    let temp = next_node[7];
    next_node[7] = next_node[1];
    next_node[1] = next_node[17];
    next_node[17] = next_node[19];
    next_node[19] = temp;
    temp = next_node[14];
    next_node[14] = next_node[3];
    next_node[3] = next_node[10];
    next_node[10] = next_node[20];
    next_node[20] = temp;
    temp = next_node[8];
    next_node[8] = next_node[9];
    next_node[9] = next_node[16];
    next_node[16] = next_node[15];
    next_node[15] = temp;
    return next_node;
}
function U_move(prev_node, next_node)
{
    next_node = prev_node.slice();
    let temp = next_node[4];
    next_node[4] = next_node[6];
    next_node[6] = next_node[8];
    next_node[8] = next_node[10];
    next_node[10] = temp;
    temp = next_node[5];
    next_node[5] = next_node[7];
    next_node[7] = next_node[9];
    next_node[9] = next_node[11];
    next_node[11] = temp;
    temp = next_node[0];
    next_node[0] = next_node[2];
    next_node[2] = next_node[3];
    next_node[3] = next_node[1];
    next_node[1] = temp;
    return next_node;
}
function U1_move(prev_node, next_node)
{
    next_node = prev_node.slice();
    let temp = next_node[4];
    next_node[4] = next_node[10];
    next_node[10] = next_node[8];
    next_node[8] = next_node[6];
    next_node[6] = temp;
    temp = next_node[5];
    next_node[5] = next_node[11];
    next_node[11] = next_node[9];
    next_node[9] = next_node[7];
    next_node[7] = temp;
    temp = next_node[0];
    next_node[0] = next_node[1];
    next_node[1] = next_node[3];
    next_node[3] = next_node[2];
    next_node[2] = temp;
    return next_node;
}
function F_move(prev_node, next_node)
{
    next_node = prev_node.slice();
    let temp = next_node[2];
    next_node[2] = next_node[12];
    next_node[12] = next_node[19];
    next_node[19] = next_node[8];
    next_node[8] = temp;
    temp = next_node[3];
    next_node[3] = next_node[5];
    next_node[5] = next_node[18];
    next_node[18] = next_node[15];
    next_node[15] = temp;
    temp = next_node[6];
    next_node[6] = next_node[13];
    next_node[13] = next_node[14];
    next_node[14] = next_node[7];
    next_node[7] = temp;
    return next_node;
}
function F1_move(prev_node, next_node)
{
    next_node = prev_node.slice();
    let temp = next_node[2];
    next_node[2] = next_node[8];
    next_node[8] = next_node[19];
    next_node[19] = next_node[12];
    next_node[12] = temp;
    temp = next_node[3];
    next_node[3] = next_node[15];
    next_node[15] = next_node[18];
    next_node[18] = next_node[5];
    next_node[5] = temp;
    temp = next_node[6];
    next_node[6] = next_node[7];
    next_node[7] = next_node[14];
    next_node[14] = next_node[13];
    next_node[13] = temp;
    return next_node;
}

let fl = 1;

async function func(position, sol, index)
{
    let out='';
    let temp_pos = position.slice();
    let new_sol = sol.slice();
    let ref = ['R','r','U','u','F','f'];
    let rindex = -1;

    if (temp_pos.join('') === "YYYYOOBBRRGGOBBRRGWWW")
    {
        if (fl)
        {
            let outt = `\t\"depth\": ${index},\n\t\"sols\": [\n\t\t\"`;
            
            out = out.concat(outt);
            fl = 0;
        }
        if (index == 0)
        {
            out = out.concat("\n\n");
            return out;
        }
        
        for (let i = 0; i < index; i++)
        {
            if (new_sol[i] == 'r')
                out = out.concat("R'");
            else if (new_sol[i] == 'f')
                out = out.concat("F'");
            else if (new_sol[i] == 'u')
                out = out.concat("U'");
            else
                out = out.concat(new_sol[i]+' ');
        }
        out = out.concat("\",\n\t\t\"");
        fine++;
        return out;
    }
    
    
    let line_split = await findByState(temp_pos.join(''))
    let y = 0;
    while (y<6)
    {
        let move = await line_split[y];
        rindex++;
        if (move === true)
        {
            
            let k = ref[rindex];
            new_sol.push(k);
            let new_pos = [];
            
            switch (k)
            {
            case 'R':
                new_pos = R_move(temp_pos, new_pos).slice();
                let out1= await func(new_pos, new_sol, index + 1);
                out = out.concat(out1)
                break;
            case 'r':
                new_pos= R1_move(temp_pos, new_pos).slice();
                let out2= await func(new_pos, new_sol, index + 1);
                out = out.concat(out2)
                break;
            case 'U':
                new_pos= U_move(temp_pos, new_pos).slice();
                let out3= await func(new_pos, new_sol, index + 1);
                out = out.concat(out3)
                break;
            case 'u':
                new_pos= U1_move(temp_pos, new_pos).slice();
                let out4= await func(new_pos, new_sol, index + 1);
                out = out.concat(out4)
                break;
            case 'F':
                new_pos= F_move(temp_pos, new_pos).slice();
                let out5= await func(new_pos, new_sol, index + 1);
                out = out.concat(out5)
                break;
            case 'f':
                new_pos= F1_move(temp_pos, new_pos).slice();
                let out6= await func(new_pos, new_sol, index + 1);
                out = out.concat(out6)
                break;
            }
            new_sol.pop();
        }
        y++;
    }
    // console.log("inside")
    return out
}



function get_opp(i)
{
    switch (i)
    {
    case 'W':
        return 'Y';

    case 'Y':
        return 'W';

    case 'O':
        return 'R';

    case 'R':
        return 'O';

    case 'G':
        return 'B';

    case 'B':
        return 'G';

    default:
        return 'X';
    }
}

function setStndString(org_state, stn_state)
{
    let from_to = [];

    from_to.push([org_state[12], 'O'])
    from_to.push([get_opp(org_state[12]), get_opp('O')])

    from_to.push([org_state[19], 'G'])
    from_to.push([get_opp(org_state[19]), get_opp('G')])

    from_to.push([org_state[22], 'W'])
    from_to.push([get_opp(org_state[22]), get_opp('W')])

    let i = 0;
    let j = 0;
    while (i < 24)
    {
        if (i == 12 || i == 19 || i == 22)
        {
            i++;
            continue;
        }

        for (let k = 0; k < 6; k++)
        {
            if (from_to[k][0] == org_state[i])
            {
                stn_state[j] = from_to[k][1];
                i++;
                j++;
                break;
            }
        }
    }
}




async function findSols(ip)
{
    let output = '';
    fl=1;
    fine =1;

    let org_state = new Array(24);
    let state_temp = new Array(21);
    let state = new Array(21);
    let sol = [];

    let input = ip.slice();
    org_state = input.split('');

    setStndString(org_state, state_temp);
    state = state_temp.slice();

    output = output.concat(`{\n\t\"position\": \"${org_state.join('')}\",\n`);

    let out= await func(state, sol, 0);
    output = output.concat(out)

    let len = output.length;
    output = output.substring(0, len-5);
    output = output.concat(`\n\t]\n}`);
    return output;

}


module.exports = {isValid, findSols};