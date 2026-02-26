# Symbol Table — AI-to-AI Communication

## Operations (op)
| Symbol | Meaning |
|--------|---------|
| `CF` | CreateFile |
| `MF` | ModifyFile |
| `DF` | DeleteFile |
| `AM` | AddMethod |
| `AC` | AddColumn |
| `AR` | AddRoute |
| `AV` | AddValidation |
| `AP` | AddProp |
| `AE` | AddEmit |
| `AI` | AddImport |

## Layers
| Symbol | Layer |
|--------|-------|
| `C` | Controller |
| `S` | Service |
| `R` | Repository |
| `M` | Model |
| `MG` | Migration |
| `V` | Vue Component |
| `CO` | Vue Composable |
| `RN` | React Native Component |
| `RNH` | React Native Hook |
| `RT` | Route |
| `CFG` | Config |
| `TS` | Test |

## Types (t)
| Symbol | Type |
|--------|------|
| `s` | string |
| `i` | integer |
| `b` | boolean |
| `d` | decimal |
| `dt` | datetime |
| `j` | json |
| `fk` | foreign key |
| `e` | enum |
| `a` | array |
| `?` | nullable modifier |

## Fix Directives
| Directive | Meaning |
|-----------|---------|
| `move_to:{path}` | Move file to path |
| `replace:{old}->{new}` | Replace value |
| `delete` | Remove element |
| `add_layer:{S\|R}` | Add missing layer |
| `wrap:{component}` | Wrap in component |
| `use_class:{class}` | Use existing class |

## Example
```
CF:M:Order{user_id:fk,amount:d,status:e,created_at:dt}
CF:MG:create_orders_table
MF:R:OrderRepository AM:getByUser(user_id:i)->a
CF:V:OrderList AP:items:a deps:OrderRepository
```
