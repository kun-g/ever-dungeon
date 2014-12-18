getPKRewardByDiff = function(diff, stop, data) {
	// top5.prize = 150
	// top15.prize = 50
	//6->5 =>50 
	//6->4 =>200
	var begin = stop - diff;
	var result = data.reduce(function(acc, cfg, idx){
		//6->5 [{idx:0,count:1}]
		//6->4 [{idx:0,count:1}, {idx:1,count:1}]
		if(acc.cur < stop) {
			if(acc.cur < cfg.top){
				var newCur = Math.min(stop, cfg.top);
				var count = newCur - acc.cur;
				acc.cur = newCur;
				acc.seg.push({idx:idx,count:count});
			}
		}
		return acc;
	},{seg:[],cur:begin}).seg.reduce(function(acc,seg) {
		//{idx:0, count:1} => {prize:[{type:x, count:y*n}]}
		var prizes  = data[seg.idx].prize.map(function(cfg) {
			return {type:cfg.type, count:cfg.count * seg.count};
		})
		return acc.concat(prizes);
	},[]);
	return result;
}

data = [
    {
        top:5,
        prize: [
            {"type":1, "count":150}
        ]
    },
    {
        top:15,
        prize: [
            {"type":1, "count":50}
        ]
    },
    {
        top:55,
        prize: [
            {"type":1, "count":50}
        ]
    },
	{
		top: Infinity,
		prize: [
            {"type":1, "count":50}
        ]
	},
];

getPKRewardByDiff(2,6,data)
getPKRewardByDiff(1,6,data)
getPKRewardByDiff(3,60,data)
getPKRewardByDiff(6,160,data)



