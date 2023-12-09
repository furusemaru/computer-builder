const config = {
    parent: document.getElementById("target"),
    url: "https://api.recursionist.io/builder/computers?type=",
    cpu:{
        brand: "cpuBrand",
        model: "cpuModel"
    },
    gpu:{
        brand: "gpuBrand",
        model: "gpuModel"
    },
    memoryCard:{
        num: "memoryCardNum",
        brand: "memoryCardBrand",
        model: "memoryCardModel"
    },
    storage:{
        type: "storageType",
        size: "storageSize",
        brand: "storageBrand",
        model: "storageModel"
    }
}

class PC{
    constructor(){
        this.cpuBrand = null;
        this.cpuModel = null;
        this.cpuBenchmark = null;
        this.gpuBrand = null;
        this.gpuModel = null;
        this.gpuBenchmark = null;
        this.ramBrand = null;
        this.ramModel = null;
        this.ramBenchmark = null;
        this.storageType = null;
        this.storageSize = null;
        this.storageBrand = null;
        this.storageModel = null;
        this.storageBenchmark = null;
    }

    static addBrandData(parts, selectedBrand, pc){ //->String, String, Object
        switch(parts){
            case "cpu":
                pc.cpuBrand = selectedBrand;
                break;
            case "gpu":
                pc.gpuBrand = selectedBrand;
                break;
            case "ram":
                pc.ramBrand = selectedBrand;
                break;
            case "hdd":
                pc.storageBrand = selectedBrand;
                break;
            case "ssd":
                pc.storageBrand = selectedBrand;
                break;
        }
    }

    static addModelData(parts, selectedModel, pc){ //->String, String, Object
        switch(parts){
            case "cpu":
                pc.cpuModel = selectedModel;
                break;
            case "gpu":
                pc.gpuModel = selectedModel;
                break;
            case "ram":
                pc.ramModel = selectedModel;
                break;
            case "hdd":
                pc.storageModel = selectedModel;
                break;
            case "ssd":
                pc.storageModel = selectedModel;
                break;    
        }
    }

    static addBenchmarkData(parts, benchmark, pc){ //->String, Int, Object
        switch(parts){
            case "cpu":
                pc.cpuBenchmark = benchmark;
                break;
            case "gpu":
                pc.gpuBenchmark = benchmark;
                break;
            case "ram":
                pc.ramBenchmark = benchmark;
                break;
            case "hdd":
                pc.storageBenchmark = benchmark;
                break;
            case "ssd":
                pc.storageBenchmark = benchmark;
                break;    
        }
    }

    static addStorageSizeData(size, pc){ //->String, Object
        pc.storageSize = size;
    }

    static getGamingBenchmark(pc){ //->Object
        let cpuScore = parseInt(pc.cpuBenchmark * 0.25);
        let gpuScore = parseInt(pc.gpuBenchmark * 0.6);
        let ramScore = parseInt(pc.ramBenchmark * 0.125);
        let storageScore = this.storageType = "SSD" ? parseInt(pc.storageBenchmark * 0.1) : parseInt(pc.storageBenchmark * 0.025);
        return cpuScore + gpuScore + ramScore + storageScore;
    }

    static getWorkBenchmark(pc){ //->Object
        let cpuScore = parseInt(pc.cpuBenchmark * 0.6);
        let gpuScore = parseInt(pc.gpuBenchmark * 0.25);
        let ramScore = parseInt(pc.ramBenchmark * 0.1);
        let storageScore = parseInt(pc.storageBenchmark * 0.05);
        return cpuScore + gpuScore + ramScore + storageScore;
    }
}

class View{
    
    static createbuiltPcPage(pc, gamingScore, workScore, count){ //->Object, int, int, int
        const container = document.getElementById("displayPC");
        let div = document.createElement("div");
        div.classList.add("bg-primary","text-white", "m-2", "col-12");
        div.innerHTML =
        `
        <div class="m-2 pt-3 d-flex justify-content-center">
            <h1>Your PC${count}</h1>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>CPU</h1>
            <h5>Brand: ${pc.cpuBrand}</h5>
            <h5>Model: ${pc.cpuModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>GPU</h1>
            <h5>Brand: ${pc.gpuBrand}</h5>
            <h5>Model: ${pc.gpuModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>RAM</h1>
            <h5>Brand: ${pc.ramBrand}</h5>
            <h5>Model: ${pc.ramModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex flex-column">
            <h1>Storage</h1>
            <h5>Disk: ${pc.storageType}</h5>
            <h5>Storage: ${pc.storageSize}</h5>
            <h5>Brand: ${pc.storageBrand}</h5>
            <h5>Model: ${pc.storageModel}</h5>
        </div>
        <div class="m-2 pt-3 d-flex justify-content-around align-items-center">
            <h1>Gaming: ${gamingScore}%</h1>
            <h1>Work: ${workScore}%</h1>
        </div>
        `
        container.append(div);
        return container;
    }
}


class Controller{
    static count = 0;

    static startBuildComputer(){
        const pc = new PC();
        //View.createInitialPage(pc); 
        Controller.getAllData(pc); 
        const addPcBtn = document.getElementById("addPc")
        addPcBtn.addEventListener("click",function(){
            Controller.clickAddPc(pc);
        })
    }

    static getAllData(pc){ //->Object
        const cpuBrandOp = document.getElementById(config.cpu.brand);
        const cpuModelOp = document.getElementById(config.cpu.model);
        const gpuBrandOp = document.getElementById(config.gpu.brand);
        const gpuModelOp = document.getElementById(config.gpu.model);
        const memoryCardBrandOp = document.getElementById(config.memoryCard.brand);
        const memoryCardModelOp = document.getElementById(config.memoryCard.model);
        const storageBrandOp = document.getElementById(config.storage.brand);
        const storageModelOp = document.getElementById(config.storage.model);
        
        //CPU Data: getBrandData -> getModelData
        //GPU Data: getBrandData -> getModelData
        //RAM Data: getRamData(get ram number) -> getBrandData -> getModelData
        //Storage Data: getStorageData(get type and size) -> getBrandData -> getModelData

        Controller.getBrandData("cpu", cpuBrandOp,cpuModelOp, pc);
        Controller.getBrandData("gpu", gpuBrandOp,gpuModelOp, pc);//上と同じ
        Controller.getMemoryCardData(memoryCardBrandOp, memoryCardModelOp, pc); //step3
        Controller.getStorageData(storageBrandOp, storageModelOp, pc); 
    }

    static getBrandData(parts, brandOp, modelOp, pc){ //String, NodeList, NodeList, Object
        fetch(config.url + parts).then(response=>response.json()).then(function(data){
            brandOp.innerHTML = `<option>-</option>`;
            let brandData = Controller.getBrand(data);//得たデータのブランドを取得
            let modelData = Controller.getModel(data);//モデルを取得（ブランドごと）
            let benchmarkData = Controller.getBenchmark(data);//各モデルに対するベンチマークを取得
            for(let brand in brandData){
                let option = document.createElement("option");
                option.value = brandData[brand];
                option.innerText = brandData[brand];
                brandOp.append(option);
            }
            brandOp.addEventListener("change", function(){//brandに対応したmodelを取得
                Controller.getModelData(parts, brandOp, modelOp, modelData, benchmarkData, pc);
            });
        })
    }

    static getModelData(parts, brandOp, modelOp, modelData, benchmarkData, pc){ //->String, NodeList, NodeList,Array, Array, Object
        fetch(config.url + parts).then(response=>response.json()).then(function(data){
            modelOp.innerHTML = `<option>-</option>`;
            let selectedBrand = brandOp.value;
            PC.addBrandData(parts, selectedBrand, pc);//classのbrandに代入

            if(parts == "hdd" || parts == "ssd"){
                const storageSizeOp = document.getElementById(config.storage.size);
                let selectedSize = storageSizeOp.value;
                let filteredStorageModel = Controller.filterStorageModel(selectedSize, modelData[selectedBrand]);//サイズに対応したmodelを追加
                Controller.addOptionList(filteredStorageModel, modelOp);
            }else if(parts == "ram"){
                const memoryCardNumOp = document.getElementById(config.memoryCard.num);
                let selectedNumber = memoryCardNumOp.value;
                let filteredRamModel = Controller.filterRamModel(selectedNumber, modelData[selectedBrand]);//?× GBかでフィルタリング
                Controller.addOptionList(filteredRamModel, modelOp);
            } else{
                Controller.addOptionList(modelData[selectedBrand], modelOp)//選んだブランドに対するモデル
            }
            
            modelOp.addEventListener("change", function(){
                let selectedModel = modelOp.value;
                let selectedBenchmark = benchmarkData[selectedModel];
                PC.addModelData(parts, selectedModel, pc);
                PC.addBenchmarkData(parts, selectedBenchmark, pc);
            });

        })
    }

    static getMemoryCardData(memoryCardBrandOp, memoryCardModelOp, pc){ //->NodeList, NodeList, Object
        const memoryCardNumOp = document.getElementById(config.memoryCard.num);
        memoryCardNumOp.addEventListener("change", function(){
            memoryCardBrandOp.innerHTML = `<option>-</option>`;
            Controller.getBrandData("ram", memoryCardBrandOp, memoryCardModelOp, pc);
        });
    }

    static getStorageData(storageBrandOp, storageModelOp, pc){ //->NodeList, NodeList, Object
        const storageTypeOp = document.getElementById(config.storage.type);
        const storageSizeOp = document.getElementById(config.storage.size);
        storageTypeOp.addEventListener("change", function(){
            storageSizeOp.innerHTML = `<option>-</option>`;
            let selectedStorageType = storageTypeOp.value;
            pc.storageType = selectedStorageType;
            if(selectedStorageType == "HDD"){
                Controller.getStorageSizeData("hdd");//storage size を準備
                storageSizeOp.addEventListener("change", function(){
                    storageBrandOp.innerHTML = `<option>-</option>`;
                    let selectedSize = storageSizeOp.value;
                    PC.addStorageSizeData(selectedSize, pc);//classのselectSizeに追加
                    Controller.getBrandData("hdd", storageBrandOp, storageModelOp, pc); //今までと一緒           
                })
            } else{
                Controller.getStorageSizeData("ssd");
                storageSizeOp.addEventListener("change", function(){
                    storageModelOp.innerHTML = `<option>-</option>`;
                    let selectedSize = storageSizeOp.value;
                    PC.addStorageSizeData(selectedSize, pc);
                    Controller.getBrandData("ssd", storageBrandOp, storageModelOp, pc);
                })
            }
        });
    }


    static addOptionList(arr, op){
        arr.forEach(word => {
            let option = document.createElement("option");
            option.value = word;
            option.innerText = word;
            op.append(option);
        });
    }

    static getStorageSizeData(type){ //->String
        fetch(config.url + type).then(response=>response.json()).then(function(data){
            const storageSizeOp = document.getElementById(config.storage.size);
            let storagemodelData = Controller.getStorageModel(data);//~TB,~GBが入ってる
            let storageSizeList = Controller.getStorageSizeList(storagemodelData);
            Controller.addOptionList(storageSizeList, storageSizeOp);
        });
    }

    static getStorageSizeList(storageModelData){ //->Object
        let storageModelList = Object.keys(storageModelData);//連想配列を配列に
        let tbSizeList = [];
        let gbSizeList = [];
        //以下は大きさ順にするためのソート
        storageModelList.forEach(model =>{
            if(model.includes("TB")) tbSizeList.push(parseFloat(model.replace("TB",'')));
            else gbSizeList.push(parseFloat(model.replace("GB",'')));
        })

        let sortedTb = tbSizeList.sort((a, b) => b - a).map(x => x.toString() + "TB");
        let sortedGb = gbSizeList.sort((a, b) => b - a).map(x => x.toString() + "GB");
        return sortedTb.concat(sortedGb);
    }

    static getBrand(data){ //->Array
        let brandData = {};
        for(let i in data){
            let currentData = data[i];
            if(brandData[currentData.Brand] == undefined) brandData[currentData.Brand] = currentData.Brand;
        }
        return brandData;
    }

    static getModel(data){ //->Array
        let modelData = {};
        for(let i in data){
            let currentData = data[i];
            if(modelData[currentData.Brand] == undefined) modelData[currentData.Brand] = [currentData.Model];
            else modelData[currentData.Brand].push(currentData.Model);
        }
        return modelData;
    }

    static getBenchmark(data){ //->Array
        let benchmarkData = {};
        for(let i in data){
            let currentData = data[i];
            if(benchmarkData[currentData.Model] == undefined) benchmarkData[currentData.Model] = currentData.Benchmark;
        }
        return benchmarkData;
    }

    static getStorageModel(data){ //->Array
        let modelData = {};
        for(let i in data){
            let currentData = Controller.getStorageSizeString(data[i].Model);//サイズだけ抽出
            if(modelData[currentData] == undefined) modelData[currentData] = currentData;
        }
        return modelData;
    }

    static getStorageSizeString(storageModel){ //->String
        let storageSize = storageModel.split(' ').filter(word => word.includes("GB") || word.includes("TB")).join('');
        return storageSize;
    }

    static filterStorageModel(size, storageModelData){ //->String, Array
        let storageModelList = Object.values(storageModelData);
        return storageModelList.filter(word => word.includes(' ' + size));
    }

    static filterRamModel(number, ramModelData){ //->String, Array
        let ramModelList = Object.values(ramModelData);
        return ramModelList.filter(word => word.includes(number + 'x'));
    }

    static clickAddPc(pc){ //->Object
        let modelList = [pc.cpuModel, pc.gpuModel, pc.ramModel, pc.storageModel];
        let gamingScore = PC.getGamingBenchmark(pc);
        let workScore = PC.getWorkBenchmark(pc);
        for(let i = 0; i < modelList.length; i++){
            if(modelList[i] == null) return alert("Please fill in all forms.")
        }
        Controller.count++;
        return View.createbuiltPcPage(pc, gamingScore, workScore, Controller.count);
    }
}
Controller.startBuildComputer();